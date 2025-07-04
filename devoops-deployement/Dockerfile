# Use official Maven image with Java 11
FROM maven:3.8.6-openjdk-11-slim as builder

WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests -B

# Runtime stage with Java 11
FROM openjdk:11-jre-slim

WORKDIR /app

# Copy the built JAR file
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]