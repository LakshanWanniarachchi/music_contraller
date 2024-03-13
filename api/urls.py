from django.urls import path 
from .views import RoomView ,CreateRoomView , JoinRoom , UserInRoom

urlpatterns = [
    
    path('room', RoomView.as_view()),
    path('create', CreateRoomView.as_view()),
    path('joinroom', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
]
