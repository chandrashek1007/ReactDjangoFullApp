from django.db import models
import datetime
from django.utils import timezone
# Create your models here.


class ApplicantDetails(models.Model):
    GENDER = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Others', 'Others'),
        ('NA', 'NA'),
    ]
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    gender = models.CharField(max_length=6, choices=GENDER, default='NA')
    district = models.CharField(max_length=15)
    state = models.CharField(max_length=20)
    pincode = models.CharField(max_length=6)
    govt_id_type = models.CharField(max_length=64, default="")
    govt_id_no = models.CharField(max_length=64, default="")
    modified_datetime = models.DateTimeField(default=timezone.now())
    added_datetime = models.DateTimeField(default=timezone.now())


class ReviewerDetails(models.Model):
    reviewer_id = models.IntegerField(primary_key=True)
    reviewer_name = models.CharField(max_length=30)
    modified_datetime = models.DateTimeField(default=datetime.datetime.now(tz=timezone.utc))
    added_datetime = models.DateTimeField(default=datetime.datetime.now(tz=timezone.utc))


class ApplicationDetails(models.Model):
    OWNERSHIP = [
        ('JOINT', 'JOINT'),
        ('INDIVIDUAL', 'INDIVIDUAL')
    ]
    CATEGORY = [
        ('Commerical', 'Commerical'),
        ('Residential', 'Residential')
    ]
    STATUS = [
        ('Approved', 'Approved'),
        ('Connection Released', 'Connection Released'),
        ('Pending', 'Pending'),
        ('Rejected', 'Rejected'),
    ]
    id = models.IntegerField(primary_key=True)
    applicant = models.ForeignKey(ApplicantDetails, on_delete=models.PROTECT)
    reviewer = models.ForeignKey(ReviewerDetails, on_delete=models.PROTECT)
    ownership = models.CharField(max_length=10, choices=OWNERSHIP, default='NA')
    category = models.CharField(max_length=30, choices=CATEGORY, default='NA')
    application_date = models.DateField(null=True)
    load_applied = models.IntegerField()
    approval_date = models.DateField(null=True)
    modified_date = models.DateField(null=True)
    status = models.CharField(max_length=30, choices=STATUS, default='NA')
    reviewer_comments = models.TextField()
