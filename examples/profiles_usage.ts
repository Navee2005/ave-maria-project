// Example 1: User Roles and Permissions
interface UserProfile {
  id: string              // Links to auth.users
  email: string           // User's email
  role: 'admin' | 'editor' | 'contributor' | 'user'  // Multiple role types
  permissions: string[]   // Specific permissions
  department: string     // Organization department
}

// Example 2: Extended User Information
interface ExtendedProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  bio: string
  avatar_url: string
  social_links: {
    facebook?: string
    twitter?: string
    linkedin?: string
  }
}

// Example 3: Organization/Company Profiles
interface CompanyProfile {
  id: string
  email: string
  company_name: string
  position: string
  team: string
  employee_id: string
  hire_date: Date
  manager_id: string
  office_location: string
}

// Example 4: Church Management System
interface ChurchProfile {
  id: string
  email: string
  role: 'pastor' | 'staff' | 'volunteer' | 'member'
  ministry_areas: string[]
  join_date: Date
  volunteer_hours: number
  skills: string[]
  availability: {
    days: string[]
    times: string[]
  }
}

// Example 5: Educational Platform
interface StudentProfile {
  id: string
  email: string
  student_id: string
  grade_level: number
  enrolled_courses: string[]
  academic_status: 'active' | 'inactive' | 'graduated'
  achievements: {
    certificates: string[]
    badges: string[]
    points: number
  }
  study_preferences: {
    preferred_subjects: string[]
    learning_style: string
    study_hours: number
  }
}

// Example 6: E-commerce User Preferences
interface ShopperProfile {
  id: string
  email: string
  shipping_addresses: {
    id: string
    name: string
    address: string
    is_default: boolean
  }[]
  payment_methods: {
    id: string
    type: 'card' | 'paypal'
    is_default: boolean
  }[]
  preferences: {
    newsletter: boolean
    marketing_emails: boolean
    preferred_categories: string[]
    size_preferences: {
      clothing: string
      shoes: string
    }
  }
  order_history_summary: {
    total_orders: number
    favorite_categories: string[]
    last_purchase_date: Date
  }
} 