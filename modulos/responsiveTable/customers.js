const CUSTOMERS = [
    {
        "id": "3",
        "customer image": "http://127.0.0.1:5500/images/Sonal Gharti.jpg",
        "customer": "Sonal Gharti",
        "location": "Tokyo",
        "order date": "14 Mar, 2023",
        "status": "Shipped",
        "colorStatus": "lightBlue",
        "amount": "$210.40"
    },
    {
        "id": "8",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Aayat Ali Khan",
        "location": "Islamabad",
        "order date": "30 Feb, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$149.70"
    },
    {
        "id": "5",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Sarita Limbu",
        "location": "Paris",
        "order date": "23 Apr, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$399.99"
    },
    {
        "id": "7",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Jeet Saru",
        "location": "New York",
        "order date": "20 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$399.99"
    },
    {
        "id": "4",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Alson GC",
        "location": "New Delhi",
        "order date": "25 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$149.70"
    },
    {
        "id": "1",
        "customer image": "http://127.0.0.1:5500/images/Zinzu Chan Lee.jpg",
        "customer": "Zinzu Chan Lee",
        "location": "Seoul",
        "order date": "17 Dec, 2022",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$128.90"
    },
    {
        "id": "9",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alson GC",
        "location": "Dhaka",
        "order date": "22 Dec, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$249.99"
    },
    {
        "id": "6",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alex Gonley",
        "location": "London",
        "order date": "23 Apr, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$399.99"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "3",
        "customer image": "http://127.0.0.1:5500/images/Sonal Gharti.jpg",
        "customer": "Sonal Gharti",
        "location": "Tokyo",
        "order date": "14 Mar, 2023",
        "status": "Shipped",
        "colorStatus": "lightBlue",
        "amount": "$210.40"
    },
    {
        "id": "8",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Aayat Ali Khan",
        "location": "Islamabad",
        "order date": "30 Feb, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$149.70"
    },
    {
        "id": "5",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Sarita Limbu",
        "location": "Paris",
        "order date": "23 Apr, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$399.99"
    },
    {
        "id": "7",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Jeet Saru",
        "location": "New York",
        "order date": "20 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$399.99"
    },
    {
        "id": "4",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Alson GC",
        "location": "New Delhi",
        "order date": "25 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$149.70"
    },
    {
        "id": "1",
        "customer image": "http://127.0.0.1:5500/images/Zinzu Chan Lee.jpg",
        "customer": "Zinzu Chan Lee",
        "location": "Seoul",
        "order date": "17 Dec, 2022",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$128.90"
    },
    {
        "id": "9",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alson GC",
        "location": "Dhaka",
        "order date": "22 Dec, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$249.99"
    },
    {
        "id": "6",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alex Gonley",
        "location": "London",
        "order date": "23 Apr, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$399.99"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "3",
        "customer image": "http://127.0.0.1:5500/images/Sonal Gharti.jpg",
        "customer": "Sonal Gharti",
        "location": "Tokyo",
        "order date": "14 Mar, 2023",
        "status": "Shipped",
        "colorStatus": "lightBlue",
        "amount": "$210.40"
    },
    {
        "id": "8",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Aayat Ali Khan",
        "location": "Islamabad",
        "order date": "30 Feb, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$149.70"
    },
    {
        "id": "5",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Sarita Limbu",
        "location": "Paris",
        "order date": "23 Apr, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$399.99"
    },
    {
        "id": "7",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Jeet Saru",
        "location": "New York",
        "order date": "20 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$399.99"
    },
    {
        "id": "4",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Alson GC",
        "location": "New Delhi",
        "order date": "25 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$149.70"
    },
    {
        "id": "1",
        "customer image": "http://127.0.0.1:5500/images/Zinzu Chan Lee.jpg",
        "customer": "Zinzu Chan Lee",
        "location": "Seoul",
        "order date": "17 Dec, 2022",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$128.90"
    },
    {
        "id": "9",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alson GC",
        "location": "Dhaka",
        "order date": "22 Dec, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$249.99"
    },
    {
        "id": "6",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alex Gonley",
        "location": "London",
        "order date": "23 Apr, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$399.99"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "3",
        "customer image": "http://127.0.0.1:5500/images/Sonal Gharti.jpg",
        "customer": "Sonal Gharti",
        "location": "Tokyo",
        "order date": "14 Mar, 2023",
        "status": "Shipped",
        "colorStatus": "lightBlue",
        "amount": "$210.40"
    },
    {
        "id": "8",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Aayat Ali Khan",
        "location": "Islamabad",
        "order date": "30 Feb, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$149.70"
    },
    {
        "id": "5",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Sarita Limbu",
        "location": "Paris",
        "order date": "23 Apr, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$399.99"
    },
    {
        "id": "7",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Jeet Saru",
        "location": "New York",
        "order date": "20 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$399.99"
    },
    {
        "id": "4",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Alson GC",
        "location": "New Delhi",
        "order date": "25 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$149.70"
    },
    {
        "id": "1",
        "customer image": "http://127.0.0.1:5500/images/Zinzu Chan Lee.jpg",
        "customer": "Zinzu Chan Lee",
        "location": "Seoul",
        "order date": "17 Dec, 2022",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$128.90"
    },
    {
        "id": "9",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alson GC",
        "location": "Dhaka",
        "order date": "22 Dec, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$249.99"
    },
    {
        "id": "6",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alex Gonley",
        "location": "London",
        "order date": "23 Apr, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$399.99"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "3",
        "customer image": "http://127.0.0.1:5500/images/Sonal Gharti.jpg",
        "customer": "Sonal Gharti",
        "location": "Tokyo",
        "order date": "14 Mar, 2023",
        "status": "Shipped",
        "colorStatus": "lightBlue",
        "amount": "$210.40"
    },
    {
        "id": "8",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Aayat Ali Khan",
        "location": "Islamabad",
        "order date": "30 Feb, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$149.70"
    },
    {
        "id": "5",
        "customer image": "http://127.0.0.1:5500/images/Sarita Limbu.jpg",
        "customer": "Sarita Limbu",
        "location": "Paris",
        "order date": "23 Apr, 2023",
        "status": "Pending",
        "colorStatus": "yellow",
        "amount": "$399.99"
    },
    {
        "id": "7",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Jeet Saru",
        "location": "New York",
        "order date": "20 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$399.99"
    },
    {
        "id": "4",
        "customer image": "http://127.0.0.1:5500/images/Alson GC.jpg",
        "customer": "Alson GC",
        "location": "New Delhi",
        "order date": "25 May, 2023",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$149.70"
    },
    {
        "id": "1",
        "customer image": "http://127.0.0.1:5500/images/Zinzu Chan Lee.jpg",
        "customer": "Zinzu Chan Lee",
        "location": "Seoul",
        "order date": "17 Dec, 2022",
        "status": "Delivered",
        "colorStatus": "green",
        "amount": "$128.90"
    },
    {
        "id": "9",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alson GC",
        "location": "Dhaka",
        "order date": "22 Dec, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$249.99"
    },
    {
        "id": "6",
        "customer image": "http://127.0.0.1:5500/images/Alex Gonley.jpg",
        "customer": "Alex Gonley",
        "location": "London",
        "order date": "23 Apr, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$399.99"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    {
        "id": "2",
        "customer image": "http://127.0.0.1:5500/images/Jeet Saru.jpg",
        "customer": "Jeet Saru",
        "location": "Kathmandu",
        "order date": "27 Aug, 2023",
        "status": "Cancelled",
        "colorStatus": "red",
        "amount": "$5350.50"
    },
    
]