import { Injectable } from '@nestjs/common';
import * as os from 'os-utils';
const oss = require('os');
@Injectable()
export class MonitoringService {constructor() {
    // Set up an interval to periodically log CPU and memory usage
    const interval = 1000; // Adjust the interval as needed
    setInterval(() => {
      os.cpuUsage((cpuUsage) => {
       // console.log(`CPU Usage: ${cpuUsage}%`);
      });

      //console.log(`Free Memory: ${os.freememPercentage()}`);
     // console.log(`Total Memory:${oss.totalmem()}`);
     // console.log(`Free Memory:${oss.freemem()}`);
     // console.log(Math.round((oss.freemem() * 100) / oss.totalmem()) + '%')
    }, interval);
  }}
