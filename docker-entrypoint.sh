#!/bin/bash
  
set -xeE
    
npm install -g pm2
pm2 start /config/pm2.json
      
exec pm2 logs