-- create procedure
CREATE OR REPLACE FUNCTION queue_update_notify() RETURNS trigger AS
$body$
BEGIN

  PERFORM pg_notify('ezq', json_build_object(
    'user_id', NEW.id,
    'queue_number', NEW.queue_number,
    'ticket_number', NEW.ticket_number)::text);
  RETURN NEW;
END
$body$ LANGUAGE plpgsql;

-- create trigger
DROP TRIGGER queue_publisher ON users;
CREATE TRIGGER queue_publisher AFTER UPDATE OF queue_number, ticket_number ON users
  FOR EACH ROW EXECUTE PROCEDURE queue_update_notify();