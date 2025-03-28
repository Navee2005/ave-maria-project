"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Filter, 
  Mail, 
  Calendar, 
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  LogOut
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  status: 'new' | 'read' | 'replied' | 'archived'
}

export default function AdminDashboard() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [statusFilter, setStatusFilter] = useState<Message['status'] | 'all'>('all')
  const [stats, setStats] = useState({
    total: 0,
    responded: 0,
    pending: 0
  })

  useEffect(() => {
    fetchMessages()
  }, [startDate, endDate, statusFilter])

  async function fetchMessages() {
    try {
      let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (startDate) {
        query = query.gte('created_at', startDate)
      }
      if (endDate) {
        query = query.lte('created_at', endDate)
      }

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query
      if (error) throw error
      
      setMessages(data || [])
      
      // Calculate stats
      const total = data?.length || 0
      const responded = data?.filter(msg => msg.status === 'replied').length || 0
      const pending = total - responded

      setStats({
        total,
        responded,
        pending
      })
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateMessageStatus(messageId: string, newStatus: Message['status']) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', messageId)

      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error('Error updating message status:', error)
    }
  }

  const filteredMessages = messages.filter(message => 
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Messages</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Responded</p>
              <h3 className="text-2xl font-bold">{stats.responded}</h3>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold">{stats.pending}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input 
          placeholder="Search messages..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Message['status'])}
          className="rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Messages Table */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading messages...
                </TableCell>
              </TableRow>
            ) : filteredMessages.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No messages found
                </TableCell>
              </TableRow>
            ) : (
              filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{format(new Date(message.created_at), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      message.status === 'new' ? 'bg-blue-500/10 text-blue-500' :
                      message.status === 'read' ? 'bg-yellow-500/10 text-yellow-500' :
                      message.status === 'replied' ? 'bg-green-500/10 text-green-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {message.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedMessage(message)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateMessageStatus(message.id, 'replied')}
                      >
                        Mark Replied
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">From</h4>
                <p>{selectedMessage.name} ({selectedMessage.email})</p>
              </div>
              <div>
                <h4 className="font-semibold">Subject</h4>
                <p>{selectedMessage.subject}</p>
              </div>
              <div>
                <h4 className="font-semibold">Message</h4>
                <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <h4 className="font-semibold">Received</h4>
                <p>{format(new Date(selectedMessage.created_at), 'PPpp')}</p>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => updateMessageStatus(selectedMessage.id, 'read')}>
                  Mark as Read
                </Button>
                <Button onClick={() => window.open(`mailto:${selectedMessage.email}`)}>
                  Reply via Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => updateMessageStatus(selectedMessage.id, 'archived')}
                >
                  Archive
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 