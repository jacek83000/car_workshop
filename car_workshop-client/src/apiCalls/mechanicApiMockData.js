export const mechanicList = [
    {
        "_id": 1,
        "firstName": "Maciej",
        "lastName": "Zieliński",
        "email": "maciej.zielinski@ryc.com",
        "password": "123"
    },
    {
        "_id": 2,
        "firstName": "Jan",
        "lastName": "Kowalski",
        "email": "jan.kowalski@ryc.com",
        "password": "haslo"
    },
    {
        "_id": 3,
        "firstName": "Karol",
        "lastName": "Nowak",
        "email": "karol.nowak@ryc.com",
        "password": "12345"
    }
]

export const mechanicDetailsList = [
    {
        "_id": 1,
        "firstName": "Maciej",
        "lastName": "Zieliński",
        "email": "maciej.zielinski@ryc.com",
        "password": "123",
        "repairs": [
            {
                "_id": 1,
                "startDate": "2020-01-01T00:00:00.000Z",
                "expectedEndDate": "2022-01-01T00:00:00.000Z",
                "price": "5000.00",
                "description": "wymiana miski olejowej",
                "mc_id": 1,
                "cr_id": 1,
                "car": {
                    "_id": 1,
                    "name": "Audi Q3",
                    "mileage": "133200",
                    "color": "czerwony"
                }
            },
            {
                "_id": 3,
                "startDate": "2021-01-01T00:00:00.000Z",
                "expectedEndDate": "2022-02-02T00:00:00.000Z",
                "price": "14000.00",
                "description": null,
                "mc_id": 1,
                "cr_id": 2,
                "car": {
                    "_id": 2,
                    "name": "Mclaren F1",
                    "mileage": "1200",
                    "color": "czarny"
                }
            }
        ]
    },
    {
        "_id": 2,
        "firstName": "Jan",
        "lastName": "Kowalski",
        "email": "jan.kowalski@ryc.com",
        "password": "haslo",
        "repairs": [
            {
                "_id": 2,
                "startDate": "2022-01-01T00:00:00.000Z",
                "expectedEndDate": "2022-01-03T00:00:00.000Z",
                "price": "22000.00",
                "description": "wymiana skrzyni biegów",
                "mc_id": 2,
                "cr_id": 1,
                "car": {
                    "_id": 1,
                    "name": "Audi Q3",
                    "mileage": "133200",
                    "color": "czerwony"
                }
            }
        ]
    },
    {
        "_id": 3,
        "firstName": "Karol",
        "lastName": "Nowak",
        "email": "karol.nowak@ryc.com",
        "password": "12345",
        "repairs": []
    }
]