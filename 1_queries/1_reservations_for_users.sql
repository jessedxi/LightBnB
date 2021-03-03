SELECT properties.*, reservations.*, avg(property_reviews.rating) as average_rating
FROM property_reviews
JOIN reservations ON reservations.id = reservation_id
JOIN properties ON properties.id = reservations.property_id
WHERE reservations.guest_id = 1 AND end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;