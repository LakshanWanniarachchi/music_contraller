from django.shortcuts import render
from rest_framework import generics ,status
from .serializers import RoomSerializer , CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


# Create your views here.


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    
    
    
    
class JoinRoom(APIView):
    
    look_up_url_kwrag = 'code'
    def post(self,request,format=None):
        
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        
        code = request.data.get(self.look_up_url_kwrag)
        print(code)
        
        if code != None :
            room_result = Room.objects.filter(code=code)
            
            if len(room_result) > 0 :
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({"massege": "Room Joined !"} , status=status.HTTP_200_OK)
            
            return Response({"Bad Request": "Invalid RoomCode :"} , status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"Bad Request":"Invalid data, did Not find a code"}, status=status.HTTP_400_BAD_REQUEST)
    
    
class CreateRoomView(APIView):
    
    
  
    
    serializer_class = CreateRoomSerializer
    
    

    
    def post(self , request , format=None):
        
        
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
            
        if serializer.is_valid():
                guest_can_pause = serializer.data.get("guest_can_pause")
                print(guest_can_pause)
                vote_to_skip = serializer.data.get("vote_to_skip")
                print(vote_to_skip)
                host = self.request.session.session_key
                queryset = Room.objects.filter(host=host)
                
                if queryset.exists():
                    room = queryset[0]
                    room.guest_can_pause = guest_can_pause
                    room.vote_to_skip = vote_to_skip
                    room.save(update_fields=['guest_can_pause','vote_to_skip'])
                    self.request.session['room_code']= room.code
                    return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
                    
                else:
                    room = Room(host=host , vote_to_skip = vote_to_skip , guest_can_pause = guest_can_pause )
                    room.save()
                    
                    self.request.session['room_code']= room.code
                    
                    return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
                    
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
      


class UserInRoom (APIView):
    
     def get(self , request , format=None):
         
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
            
        data = {
            
            
            "code" : self.request.session.get("room_code")
        }
        
        
        return JsonResponse(data , status=status.HTTP_200_OK)
            
            
        
    
    
    
    