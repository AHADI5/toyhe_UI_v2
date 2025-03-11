
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Document, Page } from 'react-pdf';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { 
  Image, 
  FileText, 
  Video, 
  Send, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Download,
  X,
  Mail,
  Facebook,
  Link,
  Globe,
  Users,
  MoreVertical,
  Trash2,
  Reply,
  Heart,
  Eye,
  Edit,
  ArrowLeft
} from 'lucide-react';

// Définition des rôles en dur
const USER_ROLES = {
  ADMIN: 'admin',
  MARKETING: 'marketing',
  USER: 'user'
};

// Utilisateur actuel (simulé - à remplacer par votre système d'authentification)
const currentUser = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  role: USER_ROLES.USER // Changer ici pour tester différents rôles
};

// Vérification des permissions
const canManageContent = (userRole) => {
  return userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.MARKETING;
};

// Composant pour un commentaire unique
const Comment = ({ comment, onLike, onReply, isReply = false }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  return (
    <div className={`${!isReply ? 'pl-4 border-l-2 border-gray-100' : ''} mt-3`}>
      <div className="flex space-x-3">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold">{comment.user.name}</p>
            <p>{comment.text}</p>
          </div>
          <div className="flex items-center space-x-4 mt-1 text-sm">
            <button 
              onClick={() => onLike(comment.id)}
              className={`flex items-center space-x-1 ${comment.liked ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Heart className="w-4 h-4" />
              <span>{comment.likes} J'aime</span>
            </button>
            {!isReply && (
              <button 
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-gray-500 hover:text-gray-700"
              >
                Répondre
              </button>
            )}
            <span className="text-gray-500">
              {format(new Date(comment.timestamp), "d MMMM 'à' HH:mm", { locale: fr })}
            </span>
          </div>

          {showReplyInput && !isReply && (
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Écrire une réponse..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleReplySubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Répondre
              </button>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2 space-y-2 pl-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onLike={onLike}
                  onReply={onReply}
                  isReply={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Composant pour créer de nouvelles publications
const PostComposer = ({ onPost }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [audience, setAudience] = useState('clients');

  // Vérifier si l'utilisateur a le droit de publier
  if (!canManageContent(currentUser.role)) {
    return null;
  }

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files).map(file => ({
      file: { name: file.name },
      preview: URL.createObjectURL(file),
      type: file.type.split('/')[0],
    }));
    setFiles([...files, ...newFiles]);
  };

  const handlePost = () => {
    onPost({
      text,
      files,
      timestamp: new Date(),
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      audience,
      comments: []
    });
    setText('');
    setFiles([]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-start space-x-3">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Que voulez-vous partager ?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          {files.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative">
                  {file.type === 'image' && (
                    <img src={file.preview} alt="" className="rounded-lg w-full h-32 object-cover" />
                  )}
                  {file.type === 'video' && (
                    <video 
                      src={file.preview} 
                      className="rounded-lg w-full h-32 object-cover" 
                      controls
                    />
                  )}
                  {file.type === 'application' && (
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center">
                      <FileText className="w-6 h-6 mr-2" />
                      <span className="text-sm truncate">{file.file.name}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-gray-800 rounded-full p-1"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                  />
                  <Image className="w-5 h-5 text-blue-500" />
                </label>
                <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                  <Video className="w-5 h-5 text-green-500" />
                </label>
                <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-full">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <FileText className="w-5 h-5 text-red-500" />
                </label>
              </div>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="clients">Clients</option>
                <option value="agents">Agents de l'entreprise</option>
              </select>
            </div>
            <button
              onClick={handlePost}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour afficher une publication en détail
const PostDetailPage = ({ post, onClose, onLike, onShare, onComment, onDownload }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [numPdfPages, setNumPdfPages] = useState(null);
  const [showAllComments, setShowAllComments] = useState(true);

  const handleComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar
        },
        timestamp: new Date(),
        likes: 0,
        liked: false,
        replies: []
      };
      setComments([...comments, newCommentObj]);
      onComment(post.id, newCommentObj);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                liked: !reply.liked,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReplyToComment = (commentId, replyText) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), {
            id: Date.now(),
            text: replyText,
            user: {
              name: currentUser.name,
              avatar: currentUser.avatar
            },
            timestamp: new Date(),
            likes: 0,
            liked: false
          }]
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDownloadAll = async () => {
    if (!post.files || post.files.length === 0) return;

    const zip = new JSZip();
    
    // Ajouter chaque fichier au zip
    post.files.forEach((file, index) => {
      // Utiliser fetch pour obtenir le contenu du fichier
      fetch(file.preview)
        .then(response => response.blob())
        .then(blob => {
          // Ajouter le fichier au zip avec son nom original
          zip.file(file.file.name, blob);
          
          // Si c'est le dernier fichier, générer et télécharger le zip
          if (index === post.files.length - 1) {
            zip.generateAsync({ type: "blob" })
              .then(content => {
                saveAs(content, "files.zip");
              });
          }
        });
    });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPdfPages(numPages);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        <div className="sticky top-0 bg-white py-2 border-b flex justify-between items-center z-10">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Retour</span>
          </button>
          <h2 className="text-xl font-semibold">Publication</h2>
          <div className="w-10"></div>
        </div>
        
        <div className="py-4">
          <div className="flex items-center mb-4">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{post.user.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  {format(new Date(post.timestamp), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
                <span className="text-gray-500">•</span>
                <div className="flex items-center text-sm text-gray-500">
                  {post.audience === 'clients' ? (
                    <Globe className="w-4 h-4 mr-1" />
                  ) : (
                    <Users className="w-4 h-4 mr-1" />
                  )}
                  {post.audience === 'clients' ? 'Clients' : 'Agents'}
                </div>
              </div>
            </div>
          </div>

          <p className="mb-6">{post.text}</p>

          {post.files && post.files.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Fichiers</h3>
                {post.files.length > 1 && (
                  <button
                    onClick={handleDownloadAll}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger tout</span>
                  </button>
                )}
              </div>
              <PhotoProvider>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.files.map((file, index) => (
                    <div key={index} className="relative group">
                      {file.type === 'image' && (
                        <PhotoView src={file.preview}>
                          <div className="relative cursor-pointer">
                            <img 
                              src={file.preview} 
                              alt="" 
                              className="rounded-lg w-full object-cover"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDownload(file);
                              }}
                              className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          </div>
                        </PhotoView>
                      )}
                      {file.type === 'video' && (
                        <div className="relative">
                          <video 
                            src={file.preview} 
                            className="rounded-lg w-full" 
                            controls
                          />
                          <button
                            onClick={() => onDownload(file)}
                            className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                      {file.type === 'application' && (
                        <div className="bg-gray-100 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <FileText className="w-6 h-6 mr-2 text-red-500 flex-shrink-0" />
                              <span className="text-sm truncate">{file.file.name}</span>
                            </div>
                            <button
                              onClick={() => onDownload(file)}
                              className="p-2 hover:bg-gray-200 rounded-full"
                            >
                              <Download className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                          {file.preview && (
                            <div className="mt-2">
                              <Document
                                file={file.preview}
                                onLoadSuccess={onDocumentLoadSuccess}
                              >
                                <Page pageNumber={1} width={300} />
                              </Document>
                              {numPdfPages && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Page 1 sur {numPdfPages}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </PhotoProvider>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500 py-2 border-y mb-6">
            <span>{post.likes} J'aime</span>
            <span>{comments.length} Commentaires</span>
            <span>{post.shares} Partages</span>
          </div>

          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 ${
                post.liked ? 'text-blue-500' : 'text-gray-500'
              } hover:text-blue-600`}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>J'aime</span>
            </button>

            <button
              onClick={() => onShare(post.id)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-600"
            >
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>

            {post.files && post.files.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-600"
              >
                <Download className="w-5 h-5" />
                <span>Télécharger</span>
              </button>
            )}
          </div>

          {/* Comments section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Commentaires</h3>
            
            <div className="flex space-x-2">
              <img
                src={currentUser.avatar}
                alt="Current user"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Commenter
                </button>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onLike={handleLikeComment}
                  onReply={handleReplyToComment}
                />
              ))}
              {comments.length === 0 && (
                <p className="text-gray-500 text-center py-4">Aucun commentaire pour le moment</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant pour une publication unique
const Post = ({ post, onDelete, onLike, onShare, onViewPost, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [numPdfPages, setNumPdfPages] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar
        },
        timestamp: new Date(),
        likes: 0,
        liked: false,
        replies: []
      };
      setComments([...comments, newCommentObj]);
      onAddComment(post.id, newCommentObj);
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                liked: !reply.liked,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1
              };
            }
            return reply;
          })
        };
      }
      return comment;
    }));
  };

  const handleReplyToComment = (commentId, replyText) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), {
            id: Date.now(),
            text: replyText,
            user: {
              name: currentUser.name,
              avatar: currentUser.avatar
            },
            timestamp: new Date(),
            likes: 0,
            liked: false
          }]
        };
      }
      return comment;
    }));
  };

  const shareOptions = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', action: () => onShare(post.id) },
    { icon: <Facebook className="w-4 h-4" />, label: 'Facebook', action: () => onShare(post.id) },
    { icon: <Link className="w-4 h-4" />, label: 'Copier le lien', action: () => onShare(post.id) }
  ];

  const handleDownload = (file) => {
    const url = file.preview;
    const a = document.createElement('a');
    a.href = url;
    a.download = file.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = async () => {
    if (!post.files || post.files.length === 0) return;

    const zip = new JSZip();
    
    // Ajouter chaque fichier au zip
    post.files.forEach((file, index) => {
      // Utiliser fetch pour obtenir le contenu du fichier
      fetch(file.preview)
        .then(response => response.blob())
        .then(blob => {
          // Ajouter le fichier au zip avec son nom original
          zip.file(file.file.name, blob);
          
          // Si c'est le dernier fichier, générer et télécharger le zip
          if (index === post.files.length - 1) {
            zip.generateAsync({ type: "blob" })
              .then(content => {
                saveAs(content, "files.zip");
              });
          }
        });
    });
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPdfPages(numPages);
  };

  // Determine max visible images based on screen size
  const maxVisibleImages = windowWidth >= 768 ? 4 : 3;

  const getImageGridClass = (filesCount) => {
    if (filesCount === 1) return 'grid-cols-1';
    if (filesCount === 2) return 'grid-cols-2';
    if (filesCount === 3) return 'grid-cols-2';
    return 'grid-cols-2';
  };

  const renderFileGrid = () => {
    const imageFiles = post.files.filter(file => file.type === 'image');
    const otherFiles = post.files.filter(file => file.type !== 'image');
    
    return (
      <div className="mb-4">
        {imageFiles.length > 0 && (
          <PhotoProvider>
            <div className={`grid ${getImageGridClass(imageFiles.length)} gap-2 mb-2`}>
              {imageFiles.slice(0, maxVisibleImages).map((file, index) => (
                <PhotoView key={index} src={file.preview}>
                  <div 
                    className={`relative group cursor-pointer ${
                      imageFiles.length === 3 && index === 2 ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="relative">
                      <img 
                        src={file.preview} 
                        alt="" 
                        className="rounded-lg w-full h-48 object-cover"
                      />
                      {index === maxVisibleImages - 1 && imageFiles.length > maxVisibleImages && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                          <span className="text-white text-2xl font-bold">
                            +{imageFiles.length - maxVisibleImages}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(file);
                        }}
                        className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        )}
        
        {otherFiles.map((file, index) => (
          <div key={index} className="mb-2 last:mb-0">
            {file.type === 'video' && (
              <div className="relative group">
                <video 
                  src={file.preview} 
                  className="rounded-lg w-full" 
                  controls
                />
                <button
                  onClick={() => handleDownload(file)}
                  className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            )}
            {file.type === 'application' && (
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <FileText className="w-6 h-6 mr-2 text-red-500 flex-shrink-0" />
                    <span className="text-sm truncate">{file.file.name}</span>
                  </div>
                  <button
                    onClick={() => handleDownload(file)} ```jsx
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {file.preview && (
                  <div className="mt-2">
                    <Document
                      file={file.preview}
                      onLoadSuccess={onDocumentLoadSuccess}
                    >
                      <Page pageNumber={1} width={300} />
                    </Document>
                    {numPdfPages && (
                      <p className="text-sm text-gray-500 mt-1">
                        Page 1 sur {numPdfPages}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const totalComments = comments.reduce((total, comment) => {
    return total + 1 + (comment.replies?.length || 0);
  }, 0);

  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-semibold">{post.user.name}</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  {format(new Date(post.timestamp), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
                <span className="text-gray-500">•</span>
                <div className="flex items-center text-sm text-gray-500">
                  {post.audience === 'clients' ? (
                    <Globe className="w-4 h-4 mr-1" />
                  ) : (
                    <Users className="w-4 h-4 mr-1" />
                  )}
                  {post.audience === 'clients' ? 'Clients' : 'Agents'}
                </div>
              </div>
            </div>
          </div>
          {canManageContent(currentUser.role) && (
            <div className="relative">
              <button
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
              {showOptionsMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      onViewPost(post);
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir la publication</span>
                  </button>
                  <button
                    onClick={() => {
                      onDelete(post.id);
                      setShowOptionsMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className="mb-4">{post.text}</p>

        {post.files && post.files.length > 0 && renderFileGrid()}

        <div className="flex items-center justify-between text-sm text-gray-500 py-2 border-y">
          <span>{post.likes} J'aime</span>
          <span>{totalComments} Commentaires</span>
          <span>{post.shares} Partages</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 ${
              post.liked ? 'text-blue-500' : 'text-gray-500'
            } hover:text-blue-600`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>J'aime</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Commenter</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-600"
            >
              <Share2 className="w-5 h-5" />
              <span>Partager</span>
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                {shareOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      option.action();
                      setShowShareMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-100"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {showComments && (
          <div className="mt-4 space-y-4">
            <div className="flex space-x-2">
              <img
                src={currentUser.avatar}
                alt="Current user"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Écrire un commentaire..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleComment}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Commenter
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {(showAllComments ? comments : comments.slice(0, 3)).map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onLike={handleLikeComment}
                  onReply={handleReplyToComment}
                />
              ))}
              {comments.length > 3 && !showAllComments && (
                <button
                  onClick={() => setShowAllComments(true)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Voir plus de commentaires ({comments.length - 3})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour les publicités sponsorisées
const SponsoredAds = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Découvrez nos nouveaux produits",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      link: "https://example.com",
      type: "image"
    },
    {
      id: 2,
      title: "Téléchargez notre catalogue",
      description: "Catalogue 2024 - Nouveautés",
      type: "pdf",
      file: "catalogue.pdf"
    },
    {
      id: 3,
      title: "Offre spéciale du mois",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
      link: "https://example.com/offer",
      type: "image"
    }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Sponsorisé</h2>
        {canManageContent(currentUser.role) && (
          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            Gérer les publicités
          </button>
        )}
      </div>
      <div className="space-y-4">
        {ads.map((ad) => (
          <div key={ad.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <h3 className="font-medium mb-2">{ad.title}</h3>
            {ad.type === 'image' ? (
              <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block group relative">
                <img src={ad.image} alt={ad.title} className="rounded-lg w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
              </a>
            ) : (
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-red-500" />
                    <span className="text-sm">{ad.description}</span>
                  </div>
                  <Download className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant principal Accueil
const Accueil = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      text: "Voici notre nouvelle vidéo de présentation !",
      files: [
        {
          type: 'video',
          preview: 'https://www.w3schools.com/html/mov_bbb.mp4',
          file: { name: 'presentation.mp4' }
        }
      ],
      timestamp: new Date(2024, 2, 15, 14, 30),
      user: {
        id: '2',
        name: 'Marie Dupont',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      audience: 'clients',
      comments: [
        {
          id: 101,
          text: "Superbe vidéo ! Très professionnel.",
          user: {
            name: 'Pierre Martin',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
          },
          timestamp: new Date(2024, 2, 15, 15, 0),
          likes: 3,
          liked: false,
          replies: []
        }
      ],
      likes: 15,
      shares: 5,
      liked: false
    },
    {
      id: '2',
      text: "Notre nouveau catalogue est disponible !",
      files: [
        {
          type: 'application',
          preview: 'https://www.africau.edu/images/default/sample.pdf',
          file: { name: 'catalogue_2024.pdf' }
        }
      ],
      timestamp: new Date(2024, 2, 15, 10, 15),
      user: {
        id: '3',
        name: 'Pierre Martin',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
      },
      audience: 'agents',
      comments: [],
      likes: 8,
      shares: 2,
      liked: false
    },
    {
      id: '3',
      text: "Photos de notre dernier événement !",
      files: [
        {
          type: 'image',
          preview: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
          file: { name: 'event_photo_1.jpg' }
        },
        {
          type: 'image',
          preview: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
          file: { name: 'event_photo_2.jpg' }
        },
        {
          type: 'image',
          preview: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop',
          file: { name: 'event_photo_3.jpg' }
        },
        {
          type: 'image',
          preview: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop',
          file: { name: 'event_photo_4.jpg' }
        }
      ],
      timestamp: new Date(2024, 2, 14, 16, 45),
      user: {
        id: '4',
        name: 'Sophie Bernard',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      },
      audience: 'clients',
      comments: [
        {
          id: 102,
          text: "Quel bel événement !",
          user: {
            name: 'Marie Dupont',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
          },
          timestamp: new Date(2024, 2, 14, 17, 0),
          likes: 5,
          liked: true,
          replies: [
            {
              id: 103,
              text: "Oui, c'était vraiment une belle journée !",
              user: {
                name: 'Sophie Bernard',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
              },
              timestamp: new Date(2024, 2, 14, 17, 15),
              likes: 2,
              liked: false
            }
          ]
        }
      ],
      likes: 45,
      shares: 12,
      liked: true
    }
  ]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleNewPost = (post) => {
    setPosts([{ 
      ...post, 
      id: Date.now().toString(),
      likes: 0,
      shares: 0,
      liked: false
    }, ...posts]);
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSharePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1
        };
      }
      return post;
    }));
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        }; }
      return post;
    }));
  };

  const handleDownload = (file) => {
    const url = file.preview;
    const a = document.createElement('a');
    a.href = url;
    a.download = file.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PostComposer onPost={handleNewPost} />
            {posts.map((post) => (
              <Post 
                key={post.id} 
                post={post} 
                onDelete={handleDeletePost}
                onLike={handleLikePost}
                onShare={handleSharePost}
                onViewPost={handleViewPost}
                onAddComment={handleAddComment}
              />
            ))}
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <SponsoredAds />
            </div>
          </div>
        </div>
      </div>

      {selectedPost && (
        <PostDetailPage 
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLikePost}
          onShare={handleSharePost}
          onComment={handleAddComment}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default Accueil;
```

export default Accueil