#!/bin/bash

REPLICATE_API_TOKEN="r8_E2Omu7MklhwfuMPO8SooOp2KtiGNiJV4FjDbI"

curl --silent --show-error https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions \
	--request POST \
	--header "Authorization: Bearer $REPLICATE_API_TOKEN" \
	--header "Content-Type: application/json" \
	--header "Prefer: wait" \
	--data '{
		"input": {
			"prompt": "black forest gateau cake spelling out the words \"FLUX SCHNELL\", tasty, food photography, dynamic shot"
		}
	}'