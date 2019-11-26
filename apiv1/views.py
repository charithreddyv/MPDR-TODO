from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

class TodoListView(APIView):
    def get(self, request):
        objs = Todo.objects.all()
        serialized = TodoSerializer(objs, many=True)
        return Response(serialized.data)
    def post(self,request):
        todo = request.data.get('todo')
        serialize  = TodoSerializer(data=todo)
        if serialize.is_valid(raise_exception=True):
            todo_saved = serialize.save()
        return Response(serialize.data)

class TodosView(APIView):
    def put(self, request, pk):
        saved_todo = get_object_or_404(Todo.objects.all(), pk=pk)
        data = request.data.get('todo')
        serialize = TodoSerializer(instance=saved_todo, data = data, partial=True)
        if serialize.is_valid(raise_exception=True):
            todo_saved = serialize.save()
            print(todo_saved)
            return Response({"Success": todo_saved.title})
        return Response(serialize.errors)
    def delete(self,request,pk):
        del_td = Todo.objects.get(pk=pk)
        del_td.delete()
        return Response({"success"})
    def get(self, request, pk):
        todo_obj = get_object_or_404(Todo.objects.all(), pk=pk)
        serialized_todo = TodoSerializer(todo_obj)
        return Response(serialized_todo.data)