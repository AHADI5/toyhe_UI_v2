
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image as ImageIcon, Film, FileCheck, Download, X, MoreVertical, Pencil, Trash2, Search, ArrowLeft } from 'lucide-react';

import { FaFileWord, FaFileExcel, FaFilePowerpoint, FaFilePdf, FaFileImage, FaFilm } from "react-icons/fa";
import { FaFileCircleCheck } from "react-icons/fa6";


const FRIENDS = [
  { 
    id: 1, 
    name: 'Robert KULE', 
    avatar: 'https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/480248048_1807926956707109_5555079346740583325_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFxfvIUbX18qOz5LqxfUh5HJaBNQAQ7ZxUloE1ABDtnFUsyoa6y0z29QQIyjoIisnled4fC9ZEQZAMpD8DcGz21&_nc_ohc=vQeVpqWB1EUQ7kNvgEfZRuY&_nc_oc=AdmeO-sCB7KS8CtdNYmorG2m_C6pPOT_7iuV5mhDqX-jQTmbEZDnFJf7hrQxfS6Jx4w&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=4Z7pj4sL73PpIrY0clDIvA&oh=00_AYEe97Ew0Ds1KH3MZ70pxkSFH-VSVr-sxXGX98MHl1SNFA&oe=67E09911',
    status: 'En ligne',
    fonction: 'DSG',
    affectation: 'Goma',
    message: 'A tous les personnels admnistratifs, nos aurons une reunion demain'
  },
  { 
    id: 3, 
    name: 'Nadège KAVIRA', 
    avatar: 'https://scontent.fgom1-1.fna.fbcdn.net/v/t39.30808-6/338034306_259590579751850_903286522879003501_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEGx-P7aE4tSQP8T5GZ9ufxbjrYCWMU0BpuOtgJYxTQGvWWQofPGh3_sMqft0PSd9UAe2gohw3T3_xoFmNrIKkQ&_nc_ohc=HZj6hTRA5VMQ7kNvgFIxTnj&_nc_oc=Admt84alQvLJE5v0jf4epet1noc1SOuVuZb2wTwimL62dRjpEKxeV27L65uUPa59sgg&_nc_zt=23&_nc_ht=scontent.fgom1-1.fna&_nc_gid=SO0a6rt0u0wyMYon83lrhQ&oh=00_AYFXcwTSTg98S-HKy5747DqZQYEIoXmyDb_qOh1m7tyVvw&oe=67E09A4F',
    status: 'En train d\'écrire...',
    fonction: 'P.',
    affectation: 'RTNC',
    message: `je veux te voir à cette heure petitt il faut faire de ton mieux pour qu'on se voit`
  },
  { 
    id: 4, 
    name: 'Prince KIRANGA', 
    avatar: 'https://scontent-mba2-1.xx.fbcdn.net/v/t1.6435-9/71689803_759721854486958_3279818588378103808_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEwOhC9cjiBEN3eYuxdqLG4d0qekRP3lKR3Sp6RE_eUpIpnKsx40Ojkf6JI2Mboo3ACWoK5eBFnBXJ0ovjQ4Zcl&_nc_ohc=-5k-UBQXdT4Q7kNvgGP57Ef&_nc_oc=AdlJD6RViRdk66oTBOBh7hoDT6HfivOiNiQoHgsKQp0bgte9dPSIIm0Anoe5J3L9fIc&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=ZvItwyn-0Dl2mLdrNqhvnA&oh=00_AYGwkxEx4hpxba4-2D1P1dt9AFwld93guBuyVCCPzP8Jlw&oe=68025771',
    status: 'En ligne',
    fonction: 'Guichetier',
    affectation: 'Goma',
    message: "Nous voulons organiser une réunion par rapport au problème qu'on a eu auprès de nos partenaire"
  },
  { 
    id: 5, 
    name: 'Joanna BUJIRIRI', 
    avatar: 'https://scontent.fgom1-1.fna.fbcdn.net/v/t1.6435-9/76686473_115499076564375_5490102032704471040_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF9k46HVAVFzJH3vAxBr2nme1vNnhkQztd7W82eGRDO18zycC4s_SgTfqNxbSijDN_5x0DcvFADByB-TwnyVuXM&_nc_ohc=hug91c3K3PwQ7kNvgG03sdC&_nc_oc=AdnE-jLueL_mf7YPg6SUrd24wiUYblyQ4QP6PzjeeqxSDBFMbdn1OnNsv2d4PRgRm6I&_nc_zt=23&_nc_ht=scontent.fgom1-1.fna&_nc_gid=tcZnsaPoRqaTuSWL6ugbaA&oh=00_AYH6Ruzt5sStWNVkazAkeuqb8Zv6VOa9-9I74KEXrx9-kQ&oe=68024A68',
    status: 'En ligne',
    fonction: 'P.',
    affectation: 'Hope Channel TV',
    message: `L'équipe marketing a besoin marketing a besoin d'un financement de la part du DG`
  },
  { 
    id: 6, 
    name: 'Sophie Bernard', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'En train d\'écrire...',
    fonction: 'ASP',
    affectation: 'Bukavu',
    message: `je vais te voir à cette heure petitt il faut faire de ton mieux pour qu'on se voit`
  },
  { 
    id: 7, 
    name: 'Marie Dupont', 
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    status: 'En ligne',
    fonction: 'AB',
    affectation: 'Bukavu',
    message: 'A tous les personnels admnistratifs, nos aurons une reunion demain'
  },
  { 
    id: 8, 
    name: 'Jean Martin', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'En ligne',
    fonction: 'DG',
    affectation: 'National',
    message: `L'équipe marketing a besoin marketing a besoin d'un financement de la part du DG`
  },
  { 
    id: 9, 
    name: 'Maitre KABEZO', 
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'En train d\'écrire...',
    fonction: 'DAF',
    affectation: 'National',
    message: `je vais te voir à cette heure petitt il faut faire de ton mieux pour qu'on se voit`
  },
];

const INITIAL_MESSAGES = {
  1: [
    { id: 1, text: 'Salut ! Comment ça va ?', sender: 'friend', timestamp: '10:00' },
    { id: 2, text: "Monsieur, nos partenaires viennent d’arriver. ✅ !", sender: 'user', timestamp: '10:01' },
    { 
      id: 3, 
      text: 'Voici le document dont je t\'ai parlé', 
      sender: 'friend', 
      timestamp: '10:02',
      attachment: {
        type: 'pdf',
        name: 'presentation.pdf',
        url: '#'
      }
    },
    {
      id: 4,
      sender: 'user',
      timestamp: '10:03',
      attachment: {
        type: 'image',
        name: 'photo.jpg',
        url: 'https://vitadom.fr/wp-content/uploads/2022/03/5e54d9a23b0c8e5356358162.jpeg'
      }
    },
    {
      id: 5,
      text: 'Regarde cette vidéo !',
      sender: 'friend',
      timestamp: '10:04',
      attachment: {
        type: 'video',
        name: 'video.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500',
        url: '#'
      }
    }
  ],
};

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <FaFilePdf size={32} color="#d32f2f" className="w-8 h-8" />;
    case 'doc':
    case 'docx':
      return <FaFileWord size={32} color="#2B579A" className="w-8 h-8" />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel size={32} color="#217346" className="w-8 h-8" />;
    case 'ppt':
    case 'pptx':
      return <FaFilePowerpoint size={32} color="#D14F5D" className="w-8 h-8" />;
    case 'image':
      return <FaFileImage size={32} color="#3faffa" className="w-8 h-8" />;
    case 'video':
      return <FaFileImage size={32} color="#3faffa" className="w-8 h-8" />;
    default:
      return <FaFileCircleCheck size={32} color="#4caf50" className="w-8 h-8" />;
  }
};

function Messages() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef(null);
  const messageOptionsRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'; // Hauteur minimale
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`;
    }
  }, [newMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageOptionsRef.current && !messageOptionsRef.current.contains(event.target)) {
        setShowMessageOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !attachment) return;
    if (!selectedFriend) return;

    if (editingMessage) {
      // Mode édition
      setMessages(prev => ({
        ...prev,
        [selectedFriend.id]: prev[selectedFriend.id].map(msg =>
          msg.id === editingMessage.id
            ? { ...msg, text: newMessage }
            : msg
        )
      }));
      setEditingMessage(null);
    } else {
      // Nouveau message
      const newMsg = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachment: attachment ? {
          ...attachment,
          url: previewUrl || '#',
          thumbnail: attachment.type === 'video' ? previewUrl : undefined
        } : null
      };

      setMessages(prev => ({
        ...prev,
        [selectedFriend.id]: [...(prev[selectedFriend.id] || []), newMsg]
      }));
    }

    setNewMessage('');
    setAttachment(null);
    setPreviewUrl(null);
    
    // Réinitialiser la hauteur du textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.split('/')[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    // Liste des extensions acceptées
    const acceptedExtensions = {
      documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
      images: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      videos: ['mp4', 'webm', 'ogg']
    };

    if (
      acceptedExtensions.documents.includes(fileExtension) ||
      acceptedExtensions.images.includes(fileExtension) ||
      acceptedExtensions.videos.includes(fileExtension)
    ) {
      setAttachment({
        type: fileType === 'application' ? fileExtension : fileType,
        name: file.name
      });

      if (fileType === 'image' || fileType === 'video') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert('Type de fichier non supporté');
    }
  };

  const handleImageClick = (imageUrl) => {
    setPreviewImage(imageUrl);
    setShowImagePreview(true);
  };

  const handleMessageClick = (message) => {
    if (message.sender === 'user') {
      setShowMessageOptions(message.id);
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setNewMessage(message.text || '');
    setShowMessageOptions(null);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(prev => ({
      ...prev,
      [selectedFriend.id]: prev[selectedFriend.id].filter(msg => msg.id !== messageId)
    }));
    setShowMessageOptions(null);
  };

  const handleDownload = (attachment) => {
    // Simulation du téléchargement
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredFriends = FRIENDS.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackToList = () => {
    setSelectedFriend(null);
    setSearchQuery('');
  };

  return (
    <div className="flex h-full bg-white">
      {/* Liste des amis */}
      <div className={`${
        isMobileView && selectedFriend ? 'hidden' : 'block'
      } w-full md:w-1/4 min-w-[300px] bg-white border-r overflow-y-auto rounded-lg`}>
        <div className="p-4 border-b bg-white">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Messages</h2>
          {/* Barre de recherche des amis */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un contact..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredFriends.map(friend => (
            <div
              key={friend.id}
              onClick={() => setSelectedFriend(friend)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors ${
                selectedFriend?.id === friend.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <h3 className="font-medium text-gray-900">{friend.name}</h3>
                <p className="text-sm text-gray-500 truncate whitespace-nowrap overflow-hidden w-full block">{friend.message}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Séparateur de 12px (visible uniquement sur desktop) */}
      <div className="hidden md:block w-3 bg-gray-100"></div>

      {/* Zone de discussion */}
      <div className={`${
        isMobileView && !selectedFriend ? 'hidden' : 'block'
      } flex-1 flex flex-col bg-white rounded-lg`}>
        {selectedFriend ? (
          <>
            {/* En-tête */}
            <div className="p-4 bg-white border-b flex items-center justify-between shadow-sm">
              <div className="flex items-center">
                {isMobileView && (
                  <button
                    onClick={handleBackToList}
                    className="mr-4 p-1 rounded-full hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                  </button>
                )}
                <img
                  src={selectedFriend.avatar}
                  alt={selectedFriend.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="ml-4">
                  <h2 className="font-medium text-gray-900">{selectedFriend.name}</h2>
                  <p className="text-sm text-gray-500">{selectedFriend.status}</p>
                </div>
              </div>
              <h2 className="font-medium text-gray-900">{selectedFriend.fonction } {selectedFriend.affectation}</h2>
            </div>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages[selectedFriend.id]?.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`relative max-w-[70%] rounded-lg shadow-sm cursor-pointer ${
                      message.sender === 'user' 
                        ? 'bg-[#1c75bc] text-white rounded-tr-none' 
                        : 'bg-[#f5f5ff] rounded-tl-none'
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    {message.attachment && (
                      <div className="rounded-t-lg overflow-hidden">
                        {message.attachment.type === 'image' || message.attachment.type === 'video' ? (
                          <div className="relative group">
                            <img
                              src={message.attachment.type === 'video' ? message.attachment.thumbnail : message.attachment.url}
                              alt={message.attachment.name}
                              className="w-full max-h-[300px] object-cover cursor-pointer"
                              onClick={() => handleImageClick(message.attachment.url)}
                            />
                            {message.attachment.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                <Film className="w-12 h-12 text-white" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(message.attachment);
                                }}
                                className="opacity-0 group-hover:opacity-100 transition-all"
                              >
                                <Download className="w-8 h-8 text-white" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3 p-3 bg-white/90 rounded-lg">
                            {getFileIcon(message.attachment.type)}
                            <div className="flex-1">
                              <p className="text-sm text-gray-600 font-medium">{message.attachment.name}</p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownload(message.attachment);
                                }}
                                className="mt-1 text-xs text-blue-600 hover:text-blue-700 flex items-center"
                              >
                                <Download className="w-4 h-4 mr-1" /> Télécharger
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {message.text && (
                      <div className="p-3">
                        <p className="whitespace-pre-wrap break-words">{message.text}</p>
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                        } float-right mt-1`}>
                          {message.timestamp}
                        </span>
                      </div>
                    )}

                    {/* Options du message */}
                    {showMessageOptions === message.id && message.sender === 'user' && (
                      <div
                        ref={messageOptionsRef}
                        className="absolute top-0 right-0 mt-2 mr-2 bg-white rounded-lg shadow-lg py-1 z-10"
                      >
                        <button
                          onClick={() => handleEditMessage(message)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Supprimer
                        </button>
                        {message.attachment && (
                          <button
                            onClick={() => handleDownload(message.attachment)}
                            className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Télécharger
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <div className="p-4 bg-white border-t">
              {attachment && (
                <div className="mb-3 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getFileIcon(attachment.type)}
                    <span className="text-sm text-gray-600">{attachment.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      setAttachment(null);
                      setPreviewUrl(null);
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSendMessage} className="flex items-start space-x-2">
                <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*,video/*"
                  />
                  <Paperclip className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </label>
                
                <textarea
                  ref={textareaRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={editingMessage ? "Modifier le message..." : "Écrivez votre message..."}
                  className="flex-1 p-3 border rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none min-h-[44px] overflow-hidden"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="p-3 rounded-full bg-[#1c75bc] text-white hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          // Message d'accueil quand aucune discussion n'est sélectionnée
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Bienvenue dans vos messages</h2>
              <p className="text-gray-500">Cliquez sur une discussion pour commencer</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal de prévisualisation d'image */}
      {showImagePreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setShowImagePreview(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setShowImagePreview(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;