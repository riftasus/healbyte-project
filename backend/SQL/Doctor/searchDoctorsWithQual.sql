CREATE OR REPLACE FUNCTION search_doctors_with_qualifications(
  name_input TEXT DEFAULT NULL,
  min_fee NUMERIC DEFAULT NULL,
  max_fee NUMERIC DEFAULT NULL,
  subject_input TEXT DEFAULT NULL
)
RETURNS TABLE (
  user_id UUID,
  name TEXT,
  consultation_fee NUMERIC(10, 2),
  rating NUMERIC(3, 1),
  qualifications TEXT[]
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.user_id::UUID,
    u.name::TEXT,  -- explicit cast added here
    d.consultation_fee::NUMERIC(10,2),
    d.rating::NUMERIC(3,1),
    ARRAY_AGG(
      CASE
        WHEN sub.name IS NOT NULL THEN COALESCE(deg.short_name, 'MBBS') || ' in ' || sub.name
        ELSE COALESCE(deg.short_name, 'MBBS')
      END
    )::TEXT[]
  FROM doctor d
  JOIN "user" u ON u.user_id = d.user_id
  LEFT JOIN qualification q ON q.doctor_id = d.user_id
  LEFT JOIN subj_degree sd ON sd.combined_id = q.combined_id
  LEFT JOIN subject sub ON sub.subject_id = sd.subject_id
  LEFT JOIN degree deg ON deg.degree_id = sd.degree_id
  WHERE
    (name_input IS NULL OR LOWER(u.name) LIKE LOWER('%' || name_input || '%')) AND
    (min_fee IS NULL OR d.consultation_fee >= min_fee) AND
    (max_fee IS NULL OR d.consultation_fee <= max_fee) AND
    (subject_input IS NULL OR LOWER(sub.name) LIKE LOWER('%' || subject_input || '%'))
  GROUP BY u.user_id, u.name, d.consultation_fee, d.rating
  ORDER BY d.rating DESC;
END;
$$ LANGUAGE plpgsql;
