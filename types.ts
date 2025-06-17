export type Course = {
  id: number;
  authorId: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  instructorAvatar: string | null;
  image: string | null;
  rating: number;
  level: string;
  price: string;
  type: 'self_paced' | 'tutor_paced'| 'workshop'| 'webinar'; // You can expand this if more types exist
  totalTimeLimit: number;
  passingScore: number | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  author: {
    name: string;
  };
  topics:{
    id:Number;
  }[];
  programModules: {
    programId: number;
    moduleId: number;
    position: number;
    module: {
      id: number;
      title: string;
      description: string;
      prerequisiteModuleId: number | null;
      status: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }[];
  enrollments:{
    learnerId: number;
  }[];
};

