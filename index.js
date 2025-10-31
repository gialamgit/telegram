import 'dotenv/config';
import { Telegraf, Markup } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

// ──────────────── LỆNH /start ────────────────
bot.start((ctx) => {
  ctx.reply(`👋 Xin chào ${ctx.from.first_name || 'bạn'}!
Gõ /price để xem bảng giá dịch vụ VIP 2025.`);
});

// ──────────────── LỆNH /price ────────────────
bot.command('price', async (ctx) => {
  try {
    // Xóa tin nhắn người dùng sau 30 giây
    setTimeout(() => {
      ctx.deleteMessage(ctx.message.message_id).catch(() => {});
    }, 30000);

    // Hiển thị “bot đang nhập” để tự nhiên hơn
    await ctx.sendChatAction('upload_video');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Nội dung bảng giá
    const priceTable = `
<b>🏷️ BẢNG GIÁ DỊCH VỤ VIP — 2025</b>
━━━━━━━━━━━━━━━━━━━━━

💠 <b>GÓI BOX VIP IOS IMAZING</b> — <code>120.000đ/ob</code>
┗ File Antiban và đầy đủ thể loại (nhiều khi sẽ có Filza)  
┗ Hỗ trợ 24/7 qua Telegram  

🌐 <b>Imazing</b>
┗ FFM AIM CHEST — <code>70.000đ</code>
┗ FFM AIM BỤNG — <code>50.000đ</code>
┗ FFM AIM MAGIC & BODY — <code>50.000đ</code>
┗ FFM AIM DRAG — <code>70.000đ</code>
┗ FFM AIM NECK — <code>70.000đ</code>
┗ FFM AIM NECK & HOLO — <code>100.000đ</code>
┗ FFM AIMBODY — <code>70.000đ</code>

━━━━━━━━━━━━━━━━━━━━━
💳 <b>Thanh toán:</b> Momo / Vietcombank
━━━━━━━━━━━━━━━━━━━━━
`;

    // Gửi ảnh động (GIF) kèm caption — đảm bảo hiển thị động
    const sent = await ctx.replyWithAnimation(
      { source: './ddat.mp4' },
      {
        caption: priceTable,
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.url('💳 MUA NGAY', 'https://t.me/nquangios')],
          [Markup.button.url('📞 LIÊN HỆ HỖ TRỢ', 'https://t.me/nquangios')],
        ]),
      }
    );

    // Đảm bảo tin nhắn tồn tại đúng 30 giây rồi mới xóa
    await new Promise((resolve) => setTimeout(resolve, 30000));
    await ctx.deleteMessage(sent.message_id).catch(() => {});

  } catch (err) {
    console.error('❌ Lỗi khi xử lý /price:', err);
  }
});

// ──────────────── KHỞI CHẠY BOT ────────────────
bot.launch();
console.log('✅ Bot Telegram đang chạy...');

