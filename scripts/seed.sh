#!/bin/bash

# Script para generar datos de prueba en la BD
# Uso: bash scripts/seed.sh

set -e

echo "🌱 Sembrando base de datos con datos de prueba..."

npx prisma db seed

echo "✅ Base de datos sembrada exitosamente!"
