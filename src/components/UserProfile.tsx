import { Paper, Typography, Switch, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { AppDispatch, RootState } from '../app/store';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface UserProfileProps {
  setImgSource?: (value: string) => void;
}

const UserProfile = ({ setImgSource }: UserProfileProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useSelector((state: RootState) => state.users);

  const isEditMode = !!id; // If id exists, we're in edit mode

  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgPreview(reader.result as string);
        if (setImgSource) {
          setImgSource(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      component={Paper}
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        paddingTop: 9,
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 6,
        position: "relative",
      }}
    >
      {isEditMode ? (
        <>
          <Typography
            component="span"
            sx={{
              position: "absolute",
              top: 15,
              right: 15,
              padding: 1,
              backgroundColor: "pink",
              borderRadius: "8px",
            }}
          >
            {userDetails?.status}
          </Typography>

          <Box
            sx={{
              width: '150px',
              height: '150px',
              border: '1px solid green',
              borderRadius: '50%'
            }}
          >
            <img
              src={imgPreview || userDetails?.imgSource}
              alt={userDetails?.name}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <input
              accept="image/*"
              type="file"
              style={{ display: 'none' }}
              id="image-upload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image-upload"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                cursor: 'pointer',
              }}
            ></label>
          </Box>

          <Typography
            component="h6"
            sx={{
              width: "180px",
              fontSize: "12px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
          </Typography>
        </>
      ) : (
        <Box
          sx={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: '2px dashed #d3d3d3',
            '&:hover': {
              backgroundColor: '#e9e9e9',
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {imgPreview ? (
            <img
              src={imgPreview}
              alt="New User"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
          ) : (
            <>
              <PhotoCameraIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
              <Typography
                component="span"
                sx={{
                  fontSize: '12px',
                  color: '#bdbdbd',
                  position: 'absolute',
                  top: 'calc(50% + 30px)',
                  textAlign: 'center',
                }}
              >
                Upload photo
              </Typography>
            </>
          )}
          <input
            accept="image/*"
            type="file"
            style={{ display: 'none' }}
            id="image-upload"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-upload"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              cursor: 'pointer',
            }}
          ></label>
        </Box>
      )}

      <Typography
        component="h6"
        sx={{
          width: "180px",
          fontSize: "12px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
      </Typography>

      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 4,
        }}
      >
        <Box component="div">
          <Typography>Banned</Typography>
          <Typography>Apple disable account</Typography>
        </Box>
        <Box component="div">
          <Switch aria-label="Disable Account" />
        </Box>
      </Box>

      {isEditMode && (
        <>
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: 4,
            }}
          >
            <div>
              <Typography>Email verified</Typography>
              <Typography>
                Disabling this will automatically send the user a verification email
              </Typography>
            </div>
            <Switch aria-label="Email Verified" />
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(255 244 229)",
              color: "#B71D18",
              "&:hover": {
                backgroundColor: "rgb(255 86 48 / 32%)",
                color: "#b71d18",
              },
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            Delete User
          </Button>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
