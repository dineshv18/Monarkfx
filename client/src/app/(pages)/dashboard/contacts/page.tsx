"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  AlertCircle,
  Loader2,
  RefreshCw,
  MailOpen,
  Phone,
  Search,
  MessageSquare,
  Calendar,
  Mail,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string;
  isRead?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define API response interface
interface ApiResponse {
  success: boolean;
  data?: Contact[];
  message?: string;
}

export default function ContactMessages() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 15;

  // Filter contacts based on search
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.subject &&
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchContacts = async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/contact/get-all`,
        { withCredentials: true }
      );

      if (response.data.success && response.data.data) {
        setContacts(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch contact messages");
        toast({
          title: "Error",
          description: "Failed to fetch contact messages",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error fetching contacts:", error);
      if (error.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (error.response?.status === 403) {
        setError("Access denied. Admin privileges required.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch contact messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Get current contacts for pagination
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const handleRefresh = () => {
    fetchContacts();
  };

  const renderPaginationItems = () => {
    const items = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => setCurrentPage(i)}
              className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 data-[active=true]:bg-green-600 data-[active=true]:border-green-600"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return items;
  };

  // Calculate stats
  const totalContacts = contacts.length;
  const contactsThisMonth = contacts.filter((contact) => {
    const contactDate = new Date(contact.createdAt);
    const now = new Date();
    return (
      contactDate.getMonth() === now.getMonth() &&
      contactDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const unreadContacts = contacts.filter((contact) => !contact.isRead).length;

  if (loading && contacts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-white">Loading contact messages...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Simple Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Messages</h1>
        <p className="text-zinc-300">
          View and manage all contact form submissions from your website
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Total Messages
                </p>
                <p className="text-3xl font-bold text-white">{totalContacts}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  This Month
                </p>
                <p className="text-3xl font-bold text-white">
                  {contactsThisMonth}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700 hover:border-green-500/30 transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">
                  Unread Messages
                </p>
                <p className="text-3xl font-bold text-white">
                  {unreadContacts}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MailOpen className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zinc-900/80 border-zinc-700 text-white placeholder-zinc-400 focus:border-green-500"
          />
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          disabled={isRefreshing}
          className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
        >
          {isRefreshing ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>

      {/* Contacts Table */}
      <div>
        <Card className="bg-gradient-to-br from-zinc-900/80 to-black/80 border border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Messages ({filteredContacts.length})
            </CardTitle>
            <CardDescription className="text-zinc-400">
              View and manage all contact form submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert
                variant="destructive"
                className="mb-6 bg-red-500/10 border-red-500/30"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-red-400">Error</AlertTitle>
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            ) : null}

            {filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <MailOpen className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  No contact messages found
                </h3>
                <p className="text-zinc-400">
                  No messages match your search criteria
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption className="text-zinc-400">
                    A list of all contact form submissions
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="border-zinc-700">
                      <TableHead className="text-zinc-300 min-w-[100px]">
                        Name
                      </TableHead>
                      <TableHead className="text-zinc-300 min-w-[150px]">
                        Email
                      </TableHead>
                      <TableHead className="text-zinc-300 min-w-[120px] hidden sm:table-cell">
                        Phone
                      </TableHead>
                      <TableHead className="text-zinc-300 min-w-[150px] hidden md:table-cell">
                        Subject
                      </TableHead>
                      <TableHead className="text-zinc-300 min-w-[120px] hidden sm:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="text-zinc-300 min-w-[100px]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentContacts.map((contact, index) => (
                      <TableRow
                        key={contact.id}
                        className="border-zinc-700 hover:bg-zinc-800/50 transition-colors"
                      >
                        <TableCell className="font-medium text-white">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {contact.name.charAt(0).toUpperCase()}
                            </div>
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-zinc-300">
                          {contact.email}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-zinc-300">
                          {contact.phone}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-zinc-300">
                          {contact.subject || "N/A"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-zinc-300">
                          {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-zinc-900/95 to-black/95 border border-zinc-700">
                              <DialogHeader>
                                <DialogTitle className="text-xl text-white">
                                  Contact Message
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                  From: {contact.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-6 py-4">
                                <div className="flex items-center gap-2">
                                  <MailOpen className="h-4 w-4 text-zinc-400" />
                                  <a
                                    href={`mailto:${contact.email}`}
                                    className="text-sm text-blue-400 hover:underline"
                                  >
                                    {contact.email}
                                  </a>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-zinc-400" />
                                  <a
                                    href={`tel:${contact.phone}`}
                                    className="text-sm text-blue-400 hover:underline"
                                  >
                                    {contact.phone}
                                  </a>
                                </div>
                                <div>
                                  <h4 className="font-medium text-lg mb-2 text-white">
                                    {contact.subject || "No Subject"}
                                  </h4>
                                  <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-md">
                                    <p className="text-sm whitespace-pre-wrap text-zinc-300">
                                      {contact.message}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-sm text-zinc-400">
                                  Received on:{" "}
                                  {format(new Date(contact.createdAt), "PPpp")}
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    className="border-zinc-600 text-zinc-300 hover:border-green-500 hover:text-white"
                                  >
                                    Close
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          {filteredContacts.length > contactsPerPage && (
            <CardFooter>
              <Pagination className="w-full">
                <PaginationContent>
                  <PaginationItem>
                    {currentPage > 1 ? (
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="cursor-pointer bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                      />
                    ) : (
                      <PaginationPrevious className="pointer-events-none opacity-50 bg-zinc-800 border-zinc-700" />
                    )}
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    {currentPage < totalPages ? (
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        className="cursor-pointer bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                      />
                    ) : (
                      <PaginationNext className="pointer-events-none opacity-50 bg-zinc-800 border-zinc-700" />
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
