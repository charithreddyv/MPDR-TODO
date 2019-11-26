from .models import Todo
from rest_framework import serializers

class TodoSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    title = serializers.CharField(max_length=20)
    description = serializers.CharField(max_length=100)
    completed = serializers.BooleanField()

    def create(self, validated_data):
        a =  Todo.objects.create(**validated_data)        
        return a
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description, allow_null=True)
        instance.completed = validated_data.get('completed', instance.completed)        
        instance.save()
        return instance