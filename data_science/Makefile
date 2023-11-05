build-ElectricityBillPredictor:
	# Install Source Files
	mkdir -p $(ARTIFACTS_DIR)
	cp -R src/*.py src/model.json $(ARTIFACTS_DIR)/
	# Remove any .pyc files copied
	find $(ARTIFACTS_DIR)/ -iname "*.pyc" -exec bash -c "rm \"{}\"" \;
	# Install Requiements
	python3 -m pip install -r requirements.txt -t $(ARTIFACTS_DIR)
	# Clean up
	rm -rf $(ARTIFACTS_DIR)/bin
