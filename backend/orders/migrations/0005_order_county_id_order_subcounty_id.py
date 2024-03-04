# Generated by Django 4.2.10 on 2024-03-03 15:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20240224_2153'),
        ('orders', '0004_alter_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='county_id',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='api.county'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='subcounty_id',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='api.subcounty'),
            preserve_default=False,
        ),
    ]