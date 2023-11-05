build-ContainerSimulator:
	# Install Source Files
	mkdir -p $(ARTIFACTS_DIR)
	cp -R src/container_simulator.py $(ARTIFACTS_DIR)/
	# Remove any .pyc files copied
	find $(ARTIFACTS_DIR)/ -iname "*.pyc" -exec bash -c "rm \"{}\"" \;
	# Install Requiements
	python3 -m pip install boto3 urllib3==1.26.6 -t $(ARTIFACTS_DIR)
	# Clean up
	rm -rf $(ARTIFACTS_DIR)/bin

build-FloodSensorSimulator:
	# Install Source Files
	mkdir -p $(ARTIFACTS_DIR)
	cp -R src/flood_simulator.py $(ARTIFACTS_DIR)/
	# Remove any .pyc files copied
	find $(ARTIFACTS_DIR)/ -iname "*.pyc" -exec bash -c "rm \"{}\"" \;
	# Install Requiements
	python3 -m pip install boto3 urllib3==1.26.6 -t $(ARTIFACTS_DIR)
	# Clean up
	rm -rf $(ARTIFACTS_DIR)/bin
