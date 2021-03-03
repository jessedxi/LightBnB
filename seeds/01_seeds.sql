INSERT INTO users (name, email,  password)
VALUES ('John Dillinger', 'escapeplane@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jeffrey Dahmer', 'heart_you@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ed Gein', 'face_off@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, street, province, post_code, active)
VALUES(1, 'Alcatraz', 'Description', 'https://en.wikipedia.org/wiki/Alcatraz_Federal_Penitentiary#/media/File:Alcatraz_Island_photo_D_Ramey_Logan.jpg', 'https://upload.wikimedia.org/wikipedia/en/0/01/Alcatraz_Island_at_Sunset.jpg', 0, 0, 1, 1, 'USA', 'San Francisco', 'Island', 'CA', '94109', TRUE),
(2, 'Milwaukee Monster', 'Description', 'https://media.npr.org/assets/news/2009/10/29/house-15f40d089c4b40506cea9a21e2211084b3b25015.jpg', 'https://media.architecturaldigest.com/photos/59fb544e9c9e3823c5b55d18/2:1/w_3400,h_1700,c_limit/MFD_R1_STILL_PULLS_20170215.00086576.tiff_2KCrop_20%20copy.jpg', 220, 2, 2, 2, 'USA', 'Akron', '4480 W Bath Rd', 'OH', '44333', TRUE),
(3, 'Murder House', 'Description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9HHlFpB92MuD1S_Punq-pzUdoOYMZM5zeaA&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCkrwmvR6elpbi4rtEzL-5L92riSy6-hfDg&usqp=CAU', 100, 5, 1, 4, 'USA', 'Plainfield', 'Archer Ave', 'WI', 'N5691', TRUE);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES(TO_DATE('17/12/2015', 'DD/MM/YYYY'), TO_DATE('17/12/2016', 'DD/MM/YYYY'), 2, 1),
(TO_DATE('18/10/2019', 'DD/MM/YYYY'), TO_DATE('01/09/2020', 'DD/MM/YYYY'), 1, 2),
(TO_DATE('10/10/2020', 'DD/MM/YYYY'), TO_DATE('30/10/2020', 'DD/MM/YYYY'), 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES(1, 2, 1, 3, 'message'),
(2, 1, 2, 4, 'message'),
(1, 3, 3, 5, 'message');