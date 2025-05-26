#!/bin/bash
cd /home/kavia/workspace/code-generation/stockmaster-inventory-manager-100961-798ebc97/stockmaster_inventory_manager
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

