-- queue number update
-- create procedure
CREATE OR REPLACE FUNCTION queue_number_update_notify() RETURNS trigger AS
$body$
BEGIN

  PERFORM pg_notify('ezq_queue_number', json_build_object(
    'user_id', NEW.id,
    'queue_number', NEW.queue_number)::text);
  RETURN NEW;
END
$body$ LANGUAGE plpgsql;

-- create trigger
DROP TRIGGER IF EXISTS queue_number_publisher ON users;
CREATE TRIGGER queue_number_publisher AFTER UPDATE OF queue_number ON users
  FOR EACH ROW EXECUTE PROCEDURE queue_number_update_notify();

-- ticket request number update
CREATE OR REPLACE FUNCTION ticket_number_update_notify() RETURNS trigger AS
$body$
BEGIN

  PERFORM pg_notify('ezq_ticket_number', json_build_object(
    'user_id', NEW.id,
    'ticket_number', NEW.ticket_number)::text);
  RETURN NEW;
END
$body$ LANGUAGE plpgsql;

-- create trigger
DROP TRIGGER IF EXISTS ticket_number_publisher ON users;
CREATE TRIGGER ticket_number_publisher AFTER UPDATE OF ticket_number ON users
  FOR EACH ROW EXECUTE PROCEDURE ticket_number_update_notify();