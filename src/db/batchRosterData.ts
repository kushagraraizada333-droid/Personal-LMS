export interface BatchStudentAttendance {
  rollNumber: string;
  name: string;
  resourceId: string;
  subjects: {
    [key: string]: {
      conducted: number;
      attended: number;
      percentage: number;
      sheetPercentage: number;
      lates: number;
    };
  };
  totalConducted: number;
  totalAttended: number;
  overallPercentage: number;
}

export const BATCH_ATTENDANCE_ROSTER: BatchStudentAttendance[] = [
  {
    "rollNumber": "2026MBAPM001",
    "name": "Aabha Agrawal",
    "resourceId": "MBA26/0245",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 19,
        "percentage": 95,
        "sheetPercentage": 95,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 51,
    "overallPercentage": 89.5
  },
  {
    "rollNumber": "2026MBAPM002",
    "name": "Aarav Singh",
    "resourceId": "MBA26/0557",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 57,
    "overallPercentage": 100
  },
  {
    "rollNumber": "2026MBAPM003",
    "name": "Akshita Nagar",
    "resourceId": "MBA26/0586",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 13,
        "percentage": 65,
        "sheetPercentage": 65,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 46,
    "overallPercentage": 80.7
  },
  {
    "rollNumber": "2026MBAPM004",
    "name": "Ankita Srivastav",
    "resourceId": "MBA26/0577",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 57,
    "overallPercentage": 100
  },
  {
    "rollNumber": "2026MBAPM005",
    "name": "Aryan Jain",
    "resourceId": "MBA26/0470",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 0,
        "percentage": 0,
        "sheetPercentage": 0,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 5,
        "percentage": 41.7,
        "sheetPercentage": 38.5,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 3,
        "percentage": 30,
        "sheetPercentage": 30,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 12,
        "percentage": 60,
        "sheetPercentage": 60,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 2,
        "percentage": 20,
        "sheetPercentage": 10,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 22,
    "overallPercentage": 38.6
  },
  {
    "rollNumber": "2026MBAPM006",
    "name": "Avni Agarwal",
    "resourceId": "MBA26/0629",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 18,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 50,
    "overallPercentage": 87.7
  },
  {
    "rollNumber": "2026MBAPM007",
    "name": "Ayush Sachan",
    "resourceId": "MBA26/0196",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 3,
        "percentage": 60,
        "sheetPercentage": 60,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 11,
        "percentage": 91.7,
        "sheetPercentage": 84.6,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 50,
    "overallPercentage": 87.7
  },
  {
    "rollNumber": "2026MBAPM008",
    "name": "Harshal Bhatt",
    "resourceId": "MBA26/0104",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 55,
    "overallPercentage": 96.5
  },
  {
    "rollNumber": "2026MBAPM009",
    "name": "Charu Bansal",
    "resourceId": "MBA26/0186",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 11,
        "percentage": 91.7,
        "sheetPercentage": 84.6,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 14,
        "percentage": 70,
        "sheetPercentage": 70,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 48,
    "overallPercentage": 84.2
  },
  {
    "rollNumber": "2026MBAPM010",
    "name": "Chinmay Shirgaonkar",
    "resourceId": "MBA26/0244",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 9,
        "percentage": 75,
        "sheetPercentage": 69.2,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 54,
    "overallPercentage": 94.7
  },
  {
    "rollNumber": "2026MBAPM011",
    "name": "Dhyey Thakkar",
    "resourceId": "MBA26/0633",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 19,
        "percentage": 95,
        "sheetPercentage": 95,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 55,
    "overallPercentage": 96.5
  },
  {
    "rollNumber": "2026MBAPM012",
    "name": "Diya Bansal",
    "resourceId": "MBA26/0631",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 16,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 49,
    "overallPercentage": 86
  },
  {
    "rollNumber": "2026MBAPM013",
    "name": "Jenisha Garg",
    "resourceId": "MBA26/0536",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 17,
        "percentage": 85,
        "sheetPercentage": 85,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 35,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 48,
    "overallPercentage": 84.2
  },
  {
    "rollNumber": "2026MBAPM014",
    "name": "Maheswara Reddy",
    "resourceId": "MBA26/0496",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 56,
    "overallPercentage": 98.2
  },
  {
    "rollNumber": "2026MBAPM015",
    "name": "Siddhi Kharmale",
    "resourceId": "MBA26/0045",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 3,
        "percentage": 60,
        "sheetPercentage": 60,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 9,
        "percentage": 75,
        "sheetPercentage": 69.2,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 70,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 15,
        "percentage": 75,
        "sheetPercentage": 75,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 5,
        "percentage": 50,
        "sheetPercentage": 25,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 39,
    "overallPercentage": 68.4
  },
  {
    "rollNumber": "2026MBAPM016",
    "name": "Khushi Singhal",
    "resourceId": "MBA26/0481",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 11,
        "percentage": 91.7,
        "sheetPercentage": 84.6,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 16,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 49,
    "overallPercentage": 86
  },
  {
    "rollNumber": "2026MBAPM017",
    "name": "Kirtan Bansal",
    "resourceId": "MBA26/0431",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 11,
        "percentage": 91.7,
        "sheetPercentage": 84.6,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 19,
        "percentage": 95,
        "sheetPercentage": 95,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 54,
    "overallPercentage": 94.7
  },
  {
    "rollNumber": "2026MBAPM018",
    "name": "Kushagra Raizada",
    "resourceId": "MBA26/0463",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 18,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 51,
    "overallPercentage": 89.5
  },
  {
    "rollNumber": "2026MBAPM019",
    "name": "Lakshita Rathore",
    "resourceId": "MBA26/0510",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 70,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 17,
        "percentage": 85,
        "sheetPercentage": 85,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 35,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 46,
    "overallPercentage": 80.7
  },
  {
    "rollNumber": "2026MBAPM020",
    "name": "Mahak Baranwal",
    "resourceId": "MBA26/0456",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 70,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 18,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 49,
    "overallPercentage": 86
  },
  {
    "rollNumber": "2026MBAPM021",
    "name": "Meenal Kothari",
    "resourceId": "MBA26/0139",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 8,
        "percentage": 66.7,
        "sheetPercentage": 61.5,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 5,
        "percentage": 50,
        "sheetPercentage": 50,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 16,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 3,
        "percentage": 30,
        "sheetPercentage": 15,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 37,
    "overallPercentage": 64.9
  },
  {
    "rollNumber": "2026MBAPM022",
    "name": "Naman Sondhi",
    "resourceId": "MBA26/0066",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 2,
        "percentage": 40,
        "sheetPercentage": 40,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 16,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 47,
    "overallPercentage": 82.5
  },
  {
    "rollNumber": "2026MBAPM023",
    "name": "Navya Mendiratta",
    "resourceId": "MBA26/0575",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 17,
        "percentage": 85,
        "sheetPercentage": 85,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 48,
    "overallPercentage": 84.2
  },
  {
    "rollNumber": "2026MBAPM024",
    "name": "Nishant Mandhare",
    "resourceId": "MBA26/0006",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 18,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 51,
    "overallPercentage": 89.5
  },
  {
    "rollNumber": "2026MBAPM025",
    "name": "Nishtha Khanna",
    "resourceId": "MBA26/0233",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 17,
        "percentage": 85,
        "sheetPercentage": 85,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 54,
    "overallPercentage": 94.7
  },
  {
    "rollNumber": "2026MBAPM026",
    "name": "Nupur Mathur",
    "resourceId": "MBA26/0628",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 15,
        "percentage": 75,
        "sheetPercentage": 75,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 49,
    "overallPercentage": 86
  },
  {
    "rollNumber": "2026MBAPM027",
    "name": "Piyush Mittal",
    "resourceId": "MBA26/0178",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 11,
        "percentage": 91.7,
        "sheetPercentage": 84.6,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 18,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 45,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 52,
    "overallPercentage": 91.2
  },
  {
    "rollNumber": "2026MBAPM028",
    "name": "Rakshit Pruthi",
    "resourceId": "MBA26/0545",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 16,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 35,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 46,
    "overallPercentage": 80.7
  },
  {
    "rollNumber": "2026MBAPM029",
    "name": "Sagun Singh",
    "resourceId": "MBA26/0285",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 51,
    "overallPercentage": 89.5
  },
  {
    "rollNumber": "2026MBAPM030",
    "name": "Sanskriti Vadher",
    "resourceId": "MBA26/0541",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 19,
        "percentage": 95,
        "sheetPercentage": 95,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 55,
    "overallPercentage": 96.5
  },
  {
    "rollNumber": "2026MBAPM032",
    "name": "Bhavin Sharma",
    "resourceId": "MBA26/0103",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 2,
        "percentage": 40,
        "sheetPercentage": 40,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 17,
        "percentage": 85,
        "sheetPercentage": 85,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 49,
    "overallPercentage": 86
  },
  {
    "rollNumber": "2026MBAPM033",
    "name": "Shivani Upadhyay",
    "resourceId": "MBA26/0076",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 3,
        "percentage": 60,
        "sheetPercentage": 60,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 9,
        "percentage": 75,
        "sheetPercentage": 69.2,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 7,
        "percentage": 70,
        "sheetPercentage": 70,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 15,
        "percentage": 75,
        "sheetPercentage": 75,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 40,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 42,
    "overallPercentage": 73.7
  },
  {
    "rollNumber": "2026MBAPM034",
    "name": "Tarun Behl",
    "resourceId": "MBA26/0248",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 4,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 16,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 49,
    "overallPercentage": 86
  },
  {
    "rollNumber": "2026MBAPM035",
    "name": "Trinkle Agarwal",
    "resourceId": "MBA26/0222",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 10,
        "percentage": 83.3,
        "sheetPercentage": 76.9,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 19,
        "percentage": 95,
        "sheetPercentage": 95,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 53,
    "overallPercentage": 93
  },
  {
    "rollNumber": "2026MBAPM036",
    "name": "Vanshika Gupta",
    "resourceId": "MBA26/0627",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 11,
        "percentage": 91.7,
        "sheetPercentage": 84.6,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 19,
        "percentage": 95,
        "sheetPercentage": 95,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 55,
    "overallPercentage": 96.5
  },
  {
    "rollNumber": "2026MBAPM037",
    "name": "Vanshika Mantri",
    "resourceId": "MBA26/0056",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 0,
        "percentage": 0,
        "sheetPercentage": 0,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 0,
        "percentage": 0,
        "sheetPercentage": 0,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 0,
        "percentage": 0,
        "sheetPercentage": 0,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 0,
        "percentage": 0,
        "sheetPercentage": 0,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 0,
        "percentage": 0,
        "sheetPercentage": 0,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 0,
    "overallPercentage": 0
  },
  {
    "rollNumber": "2026MBAPM038",
    "name": "Vishal Singh",
    "resourceId": "MBA26/0098",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 8,
        "percentage": 80,
        "sheetPercentage": 80,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 55,
    "overallPercentage": 96.5
  },
  {
    "rollNumber": "2026MBAPM039",
    "name": "Khushi Sharma",
    "resourceId": "MBA26/0659",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 56,
    "overallPercentage": 98.2
  },
  {
    "rollNumber": "2026MBAPM040",
    "name": "Himani Ganeshkumar Tailor",
    "resourceId": "MBA26/0095",
    "subjects": {
      "IET": {
        "conducted": 5,
        "attended": 5,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "MRM": {
        "conducted": 12,
        "attended": 12,
        "percentage": 100,
        "sheetPercentage": 92.3,
        "lates": 0
      },
      "ME": {
        "conducted": 10,
        "attended": 9,
        "percentage": 90,
        "sheetPercentage": 90,
        "lates": 0
      },
      "PM2": {
        "conducted": 20,
        "attended": 20,
        "percentage": 100,
        "sheetPercentage": 100,
        "lates": 0
      },
      "LA": {
        "conducted": 10,
        "attended": 10,
        "percentage": 100,
        "sheetPercentage": 50,
        "lates": 0
      }
    },
    "totalConducted": 57,
    "totalAttended": 56,
    "overallPercentage": 98.2
  }
];
