from django.contrib import admin
from .models import ApplicationDetails, ApplicantDetails, ReviewerDetails

# Register your models here.
admin.site.register(ApplicantDetails)
admin.site.register(ApplicationDetails)
admin.site.register(ReviewerDetails)
