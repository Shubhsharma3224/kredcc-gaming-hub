-- Add length constraints to prevent abuse on the public-insert table
ALTER TABLE public.verifications
  ADD CONSTRAINT verifications_game_id_len CHECK (char_length(game_id) BETWEEN 3 AND 64),
  ADD CONSTRAINT verifications_game_len CHECK (char_length(game) BETWEEN 1 AND 32),
  ADD CONSTRAINT verifications_in_game_name_len CHECK (in_game_name IS NULL OR char_length(in_game_name) BETWEEN 1 AND 64),
  ADD CONSTRAINT verifications_user_agent_len CHECK (user_agent IS NULL OR char_length(user_agent) <= 512);