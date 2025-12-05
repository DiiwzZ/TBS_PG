'use client';

import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  Warning,
  Info,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';

export default function NoShowPolicyPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
        >
          ย้อนกลับ
        </Button>

        <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid rgba(255, 167, 38, 0.2)' }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            📋 นโยบาย No-Show
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            เพื่อความยุติธรรมและประสิทธิภาพในการให้บริการ
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* What is No-Show */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom color="primary">
              ❓ No-Show คืออะไร?
            </Typography>
            <Typography variant="body1" paragraph>
              No-Show หมายถึง การที่ลูกค้าจองโต๊ะไว้แล้ว แต่ไม่เช็คอินภายใน <strong>15 นาที</strong> หลังจากเวลารอบที่จอง
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>ตัวอย่าง:</strong> หากจองรอบ 20:00 น. คุณต้องเช็คอินภายใน 20:15 น. มิฉะนั้นจะถูกบันทึกเป็น No-Show
              </Typography>
            </Alert>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Consequences */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom color="primary">
              ⚠️ ผลกระทบจาก No-Show
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Warning color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="บันทึกประวัติ No-Show"
                  secondary="ระบบจะบันทึกการไม่มาตามนัดทุกครั้ง"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Cancel color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="ระงับสิทธิ์รอบฟรี (20:00 น.)"
                  secondary="เมื่อมี No-Show ในรอบฟรีครบ 3 ครั้ง จะถูกระงับสิทธิ์การจองรอบฟรีถาวร (ยังสามารถจองรอบอื่นที่มีค่าบริการได้)"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Info color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="ส่งผลต่อลูกค้าท่านอื่น"
                  secondary="โต๊ะที่จองไว้แต่ไม่มาใช้ ทำให้ลูกค้าท่านอื่นไม่สามารถจองได้"
                />
              </ListItem>
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* How to Avoid */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom color="primary">
              ✅ วิธีหลีกเลี่ยง No-Show
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="ยกเลิกล่วงหน้า"
                  secondary="หากไม่สามารถมาได้ กรุณายกเลิกการจองล่วงหน้าอย่างน้อย 1 ชั่วโมง"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="ตั้งเตือนความจำ"
                  secondary="ตั้งปลุกหรือแจ้งเตือนเพื่อไม่ให้ลืมการจอง"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="เช็คอินทันเวลา"
                  secondary="มาถึงบาร์ภายใน 15 นาทีหลังเวลาที่จอง และแสดง QR Code เพื่อเช็คอิน"
                />
              </ListItem>
            </List>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* How to Restore */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom color="primary">
              🔄 การระงับสิทธิ์รอบฟรี
            </Typography>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>การระงับสิทธิ์เป็นถาวร:</strong> เมื่อมี No-Show ในรอบฟรี (20:00 น.) ครบ 3 ครั้ง คุณจะไม่สามารถจองรอบฟรีได้อีก
              </Typography>
            </Alert>
            <Typography variant="body1" paragraph>
              ทั้งนี้ คุณยังสามารถ:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="จองรอบที่มีค่าบริการ"
                  secondary="รอบ 21:00 น. (฿500) และ 22:00 น. (฿1,000) ยังใช้งานได้ปกติ"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Info color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="ติดต่อฝ่ายบริการลูกค้า"
                  secondary="หากมีเหตุผลพิเศษ สามารถติดต่อขอพิจารณาได้"
                />
              </ListItem>
            </List>
          </Box>

          <Alert severity="info">
            <Typography variant="body2">
              <strong>หมายเหตุ:</strong> นโยบายนี้มีวัตถุประสงค์เพื่อให้ลูกค้าทุกท่านได้รับบริการอย่างเท่าเทียม
              และเป็นธรรม หากมีข้อสงสัยหรือต้องการความช่วยเหลือ สามารถติดต่อฝ่ายบริการลูกค้าได้ตลอดเวลา
            </Typography>
          </Alert>
        </Paper>
      </Container>
    </>
  );
}

