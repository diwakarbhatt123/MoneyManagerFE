package com.moneymanager.service;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.*;
import com.facebook.react.jstasks.*;
import com.facebook.react.bridge.*;

public class SmsPusher extends HeadlessJsTaskService {

  @Override
  protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "SmsPusher",
          Arguments.fromBundle(extras),
          50000, // timeout for the task
          true // optional: defines whether or not  the task is allowed in foreground. Default is false
        );
    }
    return null;
  }
}