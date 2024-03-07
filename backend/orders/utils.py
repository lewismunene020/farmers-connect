from collections import Counter
from api.models import Product
from orders.models import Order

def get_most_ordered_product():
    try:
        # Get the pproduct with the most orders
        order_products = [order.product_id for order in Order.objects.all()]
        most_common_product = Counter(order_products).most_common(1)
        if most_common_product:
            return most_common_product[0][0]
        else:
            return None
        
    except Exception as e:
        print(e)
        return None

    