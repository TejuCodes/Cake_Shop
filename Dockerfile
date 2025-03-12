  # Use an official PHP runtime with Apache
FROM php:8.1-apache

# Install necessary extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Set the working directory
WORKDIR /var/www/html

# Copy project files to container
COPY . .

# Expose port 10000
EXPOSE 10000

# Start Apache server
CMD ["apache2-foreground"]
