#!/bin/bash

echo "Removing files..."

rm -rf dist
rm -rf target

find . -type f -name "*.log" -delete

echo "Cleanup completed!"