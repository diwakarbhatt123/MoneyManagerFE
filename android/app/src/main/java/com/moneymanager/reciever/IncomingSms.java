package com.moneymanager.reciever;

import android.app.ActivityManager;
import android.content.*;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.telephony.*;
import android.os.*;
import android.util.*;
import com.moneymanager.service.SmsPusher;
import com.facebook.react.*;

import java.util.List;

public class IncomingSms extends BroadcastReceiver {

    // Get the object of SmsManager
    final SmsManager sms = SmsManager.getDefault();

    public void onReceive(Context context, Intent intent) {
    System.out.println("Diwakar log Recieved notification *******************");
                        boolean hasInternet = isNetworkAvailable(context);
                                            Intent serviceIntent = new Intent(context, SmsPusher.class);
                                            SmsMessage smsMessage = getSmsFromNotification(context, intent);
                                            serviceIntent.putExtra("hasInternet", hasInternet);
                                            serviceIntent.putExtra("message", smsMessage.getDisplayMessageBody());
                                            serviceIntent.putExtra("phoneNumber", smsMessage.getDisplayOriginatingAddress());
                                            context.startService(serviceIntent);
                                            HeadlessJsTaskService.acquireWakeLockNow(context);
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

                    }
                 return null;
        }
}