from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # Make password write-only for security

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password'] # Using username as email for simplicity
        # Optionally add 'first_name', 'last_name' if you want more user info
        # extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'], # Using email for username as per assessment requirements
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class BlogSerializer(serializers.ModelSerializer):
    # Use 'username' because Django's built-in User model uses 'username' as its primary identifier.
    # We are setting User.username = User.email in the UserSerializer.
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'author_username', 'created_at', 'updated_at']
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at'] # These fields are set by the backend