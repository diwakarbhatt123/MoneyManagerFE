import android.content.*;
import android.telephony.*;
import android.os.*;
import android.util.*;
import com.moneymanager.service.*;

public class IncomingSms extends BroadcastReceiver {

    // Get the object of SmsManager
    final SmsManager sms = SmsManager.getDefault();

    public void onReceive(Context context, Intent intent) {
                    if (!isAppOnForeground((context))) {
                        boolean hasInternet = isNetworkAvailable(context);
                                            Intent serviceIntent = new Intent(context, SmsPusher.class);
                                            SmsMessage smsMessage = getSmsFromNotification(context, intent);
                                            serviceIntent.putExtra("hasInternet", hasInternet);
                                            serviceIntent.putExtra("message", smsMessage.getDisplayMessageBody());
                                            serviceIntent.putExtra("phoneNumber", currentMessage.getDisplayOriginatingAddress());
                                            context.startService(serviceIntent);
                                            HeadlessJsTaskService.acquireWakeLockNow(context);
                    }
                }

        private boolean isAppOnForeground(Context context) {
            /**
              We need to check if app is in foreground otherwise the app will crash.
             http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
            **/
            ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
            List<ActivityManager.RunningAppProcessInfo> appProcesses =
            activityManager.getRunningAppProcesses();
            if (appProcesses == null) {
                return false;
            }
            final String packageName = context.getPackageName();
            for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
                if (appProcess.importance ==
                ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                 appProcess.processName.equals(packageName)) {
                    return true;
                }
            }
            return false;
        }

        public static boolean isNetworkAvailable(Context context) {
            ConnectivityManager cm = (ConnectivityManager)
            context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo netInfo = cm.getActiveNetworkInfo();
            return (netInfo != null && netInfo.isConnected());
        }

        private SmsMessage getSmsFromNotification(Context context, Intent intent){
            // Retrieves a map of extended data from the intent.
                    final Bundle bundle = intent.getExtras();
                    try {

                        if (bundle != null) {

                            final Object[] pdusObj = (Object[]) bundle.get("pdus");

                            for (int i = 0; i < pdusObj.length; i++) {

                                SmsMessage currentMessage = SmsMessage.createFromPdu((byte[]) pdusObj[i]);
                                return currentMessage;
                            } // end for loop
                          } // bundle is null
                    } catch (Exception e) {
                       return null;
                    }
        }
}