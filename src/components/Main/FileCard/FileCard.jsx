import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Container,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

const FileCard = ({ data, loading, error, onRefresh }) => {
  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : error ? (
        <Box>
          <Typography variant="h6" color="error">
            Error loading files.
          </Typography>
          <Button variant="contained" color="warning" onClick={onRefresh}>
            Refresh
          </Button>
        </Box>
      ) : data?.length === 0 ? (
        <Typography variant="h6">لا توجد ملفات</Typography>
      ) : (
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid item key={item._id} xs={6} sm={6} md={4} lg={2}>
              <Card
                sx={{
                  borderRadius: 8,
                  boxShadow: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  border: '2px solid #2e7d32',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  height: '300px', // Set greater height for the card
                  '&:hover': {
                    borderColor: '#2e7d32',
                    boxShadow: '0 0 20px rgba(46, 125, 50, 0.5)',
                    '& .text-block': {
                      opacity: 1,
                    },
                    '& .admin-buttons': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Link to={`/edit/${item._id}`}>
                  <Box
                    component="img"
                    alt={item?.title}
                    src={item.image} // Update this line to use the image URL from the API
                    sx={{
                      width: '100%',
                      height: '100%', // Take up the entire height of the card
                      objectFit: 'cover',
                      borderRadius: 8,
                      transition: 'transform 0.3s',
                      filter: 'brightness(80%)', // Dim the image a bit
                      '&:hover': {
                        transform: 'scale(1.1)',
                        filter: 'brightness(100%)', // Restore brightness on hover
                      },
                    }}
                  />
                </Link>
                <CardContent
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    padding: '20px', // Add padding for the text content
                    color: '#F9FCFB',
                    zIndex: 1, // Ensure text content is above the image
                  }}
                >
                  {/* Admin buttons */}
                  <Box
                    className="admin-buttons"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    <Tooltip title="تحرير" arrow placement="bottom-end">
                      <IconButton color="primary" aria-label="edit">
                        <Link to={`/edit/${item._id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Box
                    className="text-block"
                    sx={{
                      backgroundColor: 'rgba(33, 191, 115, 0.9)',
                      textAlign: 'right',
                      width: '100%',
                      opacity: 0, // Set initial opacity to 0 for fade-in effect on hover
                      transition: 'opacity 0.5s',
                      padding: '15px',
                      backdropFilter: 'blur(5px)', // Add blur effect to the background
                      borderRadius: '0 0 8px 8px', // Rounded bottom corners
                      '&:hover': {
                        opacity: 1, // Fade in on hover
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.2rem' }}>
                      {item?.title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>
                      <LanguageIcon
                        sx={{
                          fontSize: 16,
                          verticalAlign: 'middle',
                          marginRight: 1,
                        }}
                      />{' '}
                      {item.language}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FileCard;
