# Splunk and Kafka Troubleshooting Steps

## 1. Verify Splunk HEC Integration

### Check Splunk HEC Configuration
1. Open Splunk Web:
   ```
   http://localhost:8000
   ```
   - Log in with your admin credentials.

2. Navigate to:
   - **Settings > Data Inputs > HTTP Event Collector**.

3. Ensure HEC is enabled:
   - Click **Global Settings**.
   - Ensure **All Tokens** are set to `Enabled`.
   - Save the settings.

4. Verify HEC Token:
   - Ensure the token is enabled and matches your `.env` file.

### Test Splunk HEC with `curl`
Run the following command to verify HEC functionality:
```bash
curl -k -X POST -H "Authorization: Splunk <your-hec-token>" \
     -d '{"event": "test"}' \
     https://localhost:8088/services/collector
```
- Replace `<your-hec-token>` with your HEC token.
- Expected response:
  ```json
  {"text":"Success","code":0}
  ```

### Update `.env` File
Ensure your `.env` file contains the correct values:
```env
SPLUNK_URL=https://localhost:8088/services/collector
SPLUNK_HEC_TOKEN=<your-hec-token>
```

### Test Logging from Application
1. Start the Account Service:
   ```bash
   node src/index.js
   ```

2. Trigger the `/account/create` API endpoint:
   ```bash
   curl -X POST http://localhost:3001/account/create \
        -H "Content-Type: application/json" \
        -d '{"id": "1", "name": "John Doe"}'
   ```

3. Check Splunk Web for logs:
   - Search for events using:
     ```
     index=_internal source="http_event_collector"
     ```

---

## 2. Fix Kafka Issues
     ```

### Verify Kafka Topics
1. List existing topics:
   ```bash
   docker exec -it <kafka-container-name> kafka-topics --bootstrap-server localhost:9092 --list
   ```

2. Create the `ACCOUNT_CREATED` topic (if it doesn’t exist):
   ```bash
   docker exec -it <kafka-container-name> kafka-topics --bootstrap-server localhost:9092 \
       --create --topic ACCOUNT_CREATED --partitions 1 --replication-factor 1
   ```
### Test Kafka Integration
1. Start the Account Service:
   ```bash
   node src/index.js
   ```

2. Trigger the `/account/create` API endpoint:
   ```bash
   curl -X POST http://localhost:3001/account/create \
        -H "Content-Type: application/json" \
        -d '{"id": "2", "name": "Jane Doe"}'
   ```

3. Verify Kafka messages:
   - Consume messages from the `ACCOUNT_CREATED` topic:
     ```bash
     docker exec -it <kafka-container-name> kafka-console-consumer --bootstrap-server localhost:9092 \
         --topic ACCOUNT_CREATED --from-beginning
     ```

```

---

## 4. Verify Everything
1. **Splunk**:
   - Logs should appear in the Splunk UI for events sent via the API.

2. **Kafka**:
   - Messages should appear in the `ACCOUNT_CREATED` topic.


