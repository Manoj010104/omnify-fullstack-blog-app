from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.contrib.auth.models import User
from .models import Blog
from .serializers import UserSerializer, BlogSerializer
from .permissions import IsOwnerOrReadOnly # Import your custom permission

class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [] # Public endpoint

    def post(self, request, *args, **kwargs):
        # DRF's CreateAPIView automatically handles validation and saving.
        # We need to manually call it to intercept the response for a custom message.
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer) # This calls serializer.create()
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "User registered successfully! Please login."},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

class BlogListCreate(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # GET is public, POST requires auth

    def perform_create(self, serializer):
        # Set the author of the blog post to the authenticated user
        serializer.save(author=self.request.user)

class BlogDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsOwnerOrReadOnly] # GET is public, PUT/DELETE requires owner
    lookup_field = 'pk' # Use 'pk' (primary key) for the blog ID