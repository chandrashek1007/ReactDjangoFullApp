# Generated by Django 4.1.3 on 2022-12-10 12:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applicationManagement', '0002_alter_applicantdetails_added_datetime_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicantdetails',
            name='added_datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 10, 12, 52, 43, 592466, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='applicantdetails',
            name='modified_datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 10, 12, 52, 43, 592466, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='reviewerdetails',
            name='added_datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 10, 12, 52, 43, 592466, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='reviewerdetails',
            name='modified_datetime',
            field=models.DateTimeField(default=datetime.datetime(2022, 12, 10, 12, 52, 43, 592466, tzinfo=datetime.timezone.utc)),
        ),
    ]