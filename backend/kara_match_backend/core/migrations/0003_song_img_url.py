# Generated by Django 3.2.17 on 2023-02-16 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20230216_1205'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='img_url',
            field=models.TextField(default=''),
        ),
    ]
