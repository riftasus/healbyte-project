CREATE OR REPLACE FUNCTION get_or_insert_user_location(_upazila_id BIGINT, _road_no TEXT, _postal_code TEXT)
RETURNS UUID AS $$

DECLARE
  _loc_id UUID;

BEGIN
  SELECT user_location_id INTO _loc_id
  FROM user_location
  WHERE upazila_id = _upazila_id
    AND (road_no = _road_no OR (_road_no IS NULL AND road_no IS NULL))
    AND (postal_code = _postal_code OR (_postal_code IS NULL AND postal_code IS NULL))
  LIMIT 1;

  IF _loc_id IS NULL THEN
    INSERT INTO user_location (user_location_id, upazila_id, road_no, postal_code)
    VALUES (gen_random_uuid(), _upazila_id, _road_no, _postal_code)
    RETURNING user_location_id INTO _loc_id;
  END IF;

  RETURN _loc_id;
END;

$$ LANGUAGE plpgsql;
