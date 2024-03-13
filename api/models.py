from django.db import models
import string
import random

# Create your models here.



def generate_unique_code():
    length=6
    while True:
        code = ''.join(random.choice(string.ascii_lowercase) for _ in range(length))
        if not Room.objects.filter(code=code).exists():
            break
    return code 
        
        
    

class Room(models.Model):
    code = models.CharField(max_length=8 , default=generate_unique_code , unique=True)
    host = models.CharField(max_length=50, unique=True )
    guest_can_pause = models.BooleanField(null=False , default=False)
    vote_to_skip= models.IntegerField(null=False  , default=2 )
    create_at =  models.DateTimeField(auto_now_add=True)
