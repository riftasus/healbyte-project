CREATE OR REPLACE FUNCTION get_top_rated_doctors_with_qualifications()
RETURNS TABLE (
  user_id UUID,
  name TEXT,
  consultation_fee NUMERIC(10,2),
  rating NUMERIC(3,1),
  qualifications TEXT[]
)
AS $$
BEGIN
  RETURN QUERY
  SELECT
    u.user_id::UUID,
    u.name::TEXT,
    (d.consultation_fee::NUMERIC(10,2)),
    (d.rating::NUMERIC(3,1)),
    (array_agg(
      CASE
        WHEN sub.name IS NOT NULL THEN (COALESCE(deg.short_name, 'MBBS') || ' in ' || sub.name)::TEXT
        ELSE COALESCE(deg.short_name, 'MBBS')::TEXT
      END
    ))::TEXT[] AS qualifications
  FROM doctor d
  JOIN "user" u ON d.user_id = u.user_id
  LEFT JOIN qualification q ON d.user_id = q.doctor_id
  LEFT JOIN subj_degree sd ON q.combined_id = sd.combined_id
  LEFT JOIN subject sub ON sd.subject_id = sub.subject_id
  LEFT JOIN degree deg ON sd.degree_id = deg.degree_id
  WHERE d.rating IS NOT NULL
  GROUP BY u.user_id, u.name, d.consultation_fee, d.rating
  ORDER BY d.rating DESC
  LIMIT 15;
END;
$$ LANGUAGE plpgsql;