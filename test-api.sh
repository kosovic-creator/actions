#!/bin/bash

# Students API Test Script
# Promenite BASE_URL ako je potrebno
BASE_URL="http://localhost:3000"

echo "=== STUDENTS API TEST SCRIPT ==="
echo "Base URL: $BASE_URL"
echo ""

# GET All Students
echo "1. GET All Students:"
echo "curl -X GET $BASE_URL/api/students"
curl -X GET "$BASE_URL/api/students" | jq '.'
echo -e "\n"

# GET Student by ID (zameniti 1 sa stvarnim ID)
echo "2. GET Student by ID:"
echo "curl -X GET $BASE_URL/api/students/1"
curl -X GET "$BASE_URL/api/students/1" | jq '.'
echo -e "\n"

# POST Create Student
echo "3. POST Create Student:"
echo "curl -X POST $BASE_URL/api/students -H 'Content-Type: application/json' -d '{\"name\":\"Test Student\",\"email\":\"test@example.com\"}'"
curl -X POST "$BASE_URL/api/students" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Student","email":"test@example.com"}' | jq '.'
echo -e "\n"

# PUT Update Student (zameniti 1 sa stvarnim ID)
echo "4. PUT Update Student:"
echo "curl -X PUT $BASE_URL/api/students/1 -H 'Content-Type: application/json' -d '{\"name\":\"Updated Student\",\"email\":\"updated@example.com\"}'"
curl -X PUT "$BASE_URL/api/students/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Student","email":"updated@example.com"}' | jq '.'
echo -e "\n"

# DELETE Student (zameniti 1 sa stvarnim ID)
echo "5. DELETE Student:"
echo "curl -X DELETE $BASE_URL/api/students/1"
curl -X DELETE "$BASE_URL/api/students/1" | jq '.'
echo -e "\n"

echo "=== TEST ZAVRŠEN ==="