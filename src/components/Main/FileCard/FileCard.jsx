import { Box, Card, CardContent, Grid, IconButton, Tooltip, Typography, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';

const FileCard = ({ title = "عنوان البطاقة", language = "الإنجليزية" }) => {
  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <Card
            sx={{
              borderRadius: 8,
              boxShadow: 4,
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid #2e7d32',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              '&:hover': {
                borderColor: '#2e7d32',
                boxShadow: '0 0 10px #2e7d32',
                '& .text-block': {
                  opacity: 1,
                },
                '& .admin-buttons': {
                  opacity: 1,
                },
              },
            }}
          >
            <Box
              component="img"
              alt={title}
              src={`https://via.placeholder.com/130x200?text=${title}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 8,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <CardContent
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                height: '100%',
              }}
            >
              {/* Admin buttons */}
              <Box
                className="admin-buttons"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '10px',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              >
                <Tooltip title="تحرير" arrow placement="bottom-end">
                  <IconButton color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box
                className="text-block"
                sx={{
                  color: "#21BF73",
                  padding: "10px",
                  borderRadius: 8,
                  opacity: 0,
                  transition: "opacity 0.3s",
                  backgroundColor: "rgba(33, 191, 115, 0.8)",
                  textAlign: "right",
                  width: '100%',
                }}
              >
                <Typography variant="h6" color="#F9FCFB">
                  {title}
                </Typography>
                <Typography variant="subtitle2" color="#F9FCFB">
                  <LanguageIcon sx={{ fontSize: 16, verticalAlign: 'middle', marginRight: 1 }} /> {language}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FileCard;
