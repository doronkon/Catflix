package com.example.catflix_android.Daos;

import android.database.Cursor;
import androidx.annotation.NonNull;
import androidx.room.EntityDeletionOrUpdateAdapter;
import androidx.room.EntityInsertionAdapter;
import androidx.room.RoomDatabase;
import androidx.room.RoomSQLiteQuery;
import androidx.room.SharedSQLiteStatement;
import androidx.room.util.CursorUtil;
import androidx.room.util.DBUtil;
import androidx.sqlite.db.SupportSQLiteStatement;
import com.example.catflix_android.Entities.Movie;
import java.lang.Class;
import java.lang.Override;
import java.lang.String;
import java.lang.SuppressWarnings;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import javax.annotation.processing.Generated;

@Generated("androidx.room.RoomProcessor")
@SuppressWarnings({"unchecked", "deprecation"})
public final class MovieDao_Impl implements MovieDao {
  private final RoomDatabase __db;

  private final EntityInsertionAdapter<Movie> __insertionAdapterOfMovie;

  private final EntityDeletionOrUpdateAdapter<Movie> __deletionAdapterOfMovie;

  private final EntityDeletionOrUpdateAdapter<Movie> __updateAdapterOfMovie;

  private final SharedSQLiteStatement __preparedStmtOfDeleteMovieById;

  private final SharedSQLiteStatement __preparedStmtOfDeleteAll;

  public MovieDao_Impl(@NonNull final RoomDatabase __db) {
    this.__db = __db;
    this.__insertionAdapterOfMovie = new EntityInsertionAdapter<Movie>(__db) {
      @Override
      @NonNull
      protected String createQuery() {
        return "INSERT OR ABORT INTO `movies` (`_id`,`pathToMovie`,`name`,`category`,`published`,`director`,`actors`,`thumbnail`,`length`,`description`,`catflixOriginal`,`minimalAge`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      }

      @Override
      protected void bind(@NonNull final SupportSQLiteStatement statement, final Movie entity) {
        if (entity.get_id() == null) {
          statement.bindNull(1);
        } else {
          statement.bindString(1, entity.get_id());
        }
        if (entity.getPathToMovie() == null) {
          statement.bindNull(2);
        } else {
          statement.bindString(2, entity.getPathToMovie());
        }
        if (entity.getName() == null) {
          statement.bindNull(3);
        } else {
          statement.bindString(3, entity.getName());
        }
        if (entity.getCategory() == null) {
          statement.bindNull(4);
        } else {
          statement.bindString(4, entity.getCategory());
        }
        if (entity.getPublished() == null) {
          statement.bindNull(5);
        } else {
          statement.bindString(5, entity.getPublished());
        }
        if (entity.getDirector() == null) {
          statement.bindNull(6);
        } else {
          statement.bindString(6, entity.getDirector());
        }
        if (entity.getActors() == null) {
          statement.bindNull(7);
        } else {
          statement.bindString(7, entity.getActors());
        }
        if (entity.getThumbnail() == null) {
          statement.bindNull(8);
        } else {
          statement.bindString(8, entity.getThumbnail());
        }
        if (entity.getLength() == null) {
          statement.bindNull(9);
        } else {
          statement.bindString(9, entity.getLength());
        }
        if (entity.getDescription() == null) {
          statement.bindNull(10);
        } else {
          statement.bindString(10, entity.getDescription());
        }
        final int _tmp = entity.isCatflixOriginal() ? 1 : 0;
        statement.bindLong(11, _tmp);
        if (entity.getMinimalAge() == null) {
          statement.bindNull(12);
        } else {
          statement.bindString(12, entity.getMinimalAge());
        }
      }
    };
    this.__deletionAdapterOfMovie = new EntityDeletionOrUpdateAdapter<Movie>(__db) {
      @Override
      @NonNull
      protected String createQuery() {
        return "DELETE FROM `movies` WHERE `_id` = ?";
      }

      @Override
      protected void bind(@NonNull final SupportSQLiteStatement statement, final Movie entity) {
        if (entity.get_id() == null) {
          statement.bindNull(1);
        } else {
          statement.bindString(1, entity.get_id());
        }
      }
    };
    this.__updateAdapterOfMovie = new EntityDeletionOrUpdateAdapter<Movie>(__db) {
      @Override
      @NonNull
      protected String createQuery() {
        return "UPDATE OR ABORT `movies` SET `_id` = ?,`pathToMovie` = ?,`name` = ?,`category` = ?,`published` = ?,`director` = ?,`actors` = ?,`thumbnail` = ?,`length` = ?,`description` = ?,`catflixOriginal` = ?,`minimalAge` = ? WHERE `_id` = ?";
      }

      @Override
      protected void bind(@NonNull final SupportSQLiteStatement statement, final Movie entity) {
        if (entity.get_id() == null) {
          statement.bindNull(1);
        } else {
          statement.bindString(1, entity.get_id());
        }
        if (entity.getPathToMovie() == null) {
          statement.bindNull(2);
        } else {
          statement.bindString(2, entity.getPathToMovie());
        }
        if (entity.getName() == null) {
          statement.bindNull(3);
        } else {
          statement.bindString(3, entity.getName());
        }
        if (entity.getCategory() == null) {
          statement.bindNull(4);
        } else {
          statement.bindString(4, entity.getCategory());
        }
        if (entity.getPublished() == null) {
          statement.bindNull(5);
        } else {
          statement.bindString(5, entity.getPublished());
        }
        if (entity.getDirector() == null) {
          statement.bindNull(6);
        } else {
          statement.bindString(6, entity.getDirector());
        }
        if (entity.getActors() == null) {
          statement.bindNull(7);
        } else {
          statement.bindString(7, entity.getActors());
        }
        if (entity.getThumbnail() == null) {
          statement.bindNull(8);
        } else {
          statement.bindString(8, entity.getThumbnail());
        }
        if (entity.getLength() == null) {
          statement.bindNull(9);
        } else {
          statement.bindString(9, entity.getLength());
        }
        if (entity.getDescription() == null) {
          statement.bindNull(10);
        } else {
          statement.bindString(10, entity.getDescription());
        }
        final int _tmp = entity.isCatflixOriginal() ? 1 : 0;
        statement.bindLong(11, _tmp);
        if (entity.getMinimalAge() == null) {
          statement.bindNull(12);
        } else {
          statement.bindString(12, entity.getMinimalAge());
        }
        if (entity.get_id() == null) {
          statement.bindNull(13);
        } else {
          statement.bindString(13, entity.get_id());
        }
      }
    };
    this.__preparedStmtOfDeleteMovieById = new SharedSQLiteStatement(__db) {
      @Override
      @NonNull
      public String createQuery() {
        final String _query = "DELETE FROM movies WHERE _id =?";
        return _query;
      }
    };
    this.__preparedStmtOfDeleteAll = new SharedSQLiteStatement(__db) {
      @Override
      @NonNull
      public String createQuery() {
        final String _query = "DELETE from movies";
        return _query;
      }
    };
  }

  @Override
  public void insert(final Movie... movies) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __insertionAdapterOfMovie.insert(movies);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void delete(final Movie... movies) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __deletionAdapterOfMovie.handleMultiple(movies);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void update(final Movie... movies) {
    __db.assertNotSuspendingTransaction();
    __db.beginTransaction();
    try {
      __updateAdapterOfMovie.handleMultiple(movies);
      __db.setTransactionSuccessful();
    } finally {
      __db.endTransaction();
    }
  }

  @Override
  public void deleteMovieById(final String movieId) {
    __db.assertNotSuspendingTransaction();
    final SupportSQLiteStatement _stmt = __preparedStmtOfDeleteMovieById.acquire();
    int _argIndex = 1;
    if (movieId == null) {
      _stmt.bindNull(_argIndex);
    } else {
      _stmt.bindString(_argIndex, movieId);
    }
    try {
      __db.beginTransaction();
      try {
        _stmt.executeUpdateDelete();
        __db.setTransactionSuccessful();
      } finally {
        __db.endTransaction();
      }
    } finally {
      __preparedStmtOfDeleteMovieById.release(_stmt);
    }
  }

  @Override
  public void deleteAll() {
    __db.assertNotSuspendingTransaction();
    final SupportSQLiteStatement _stmt = __preparedStmtOfDeleteAll.acquire();
    try {
      __db.beginTransaction();
      try {
        _stmt.executeUpdateDelete();
        __db.setTransactionSuccessful();
      } finally {
        __db.endTransaction();
      }
    } finally {
      __preparedStmtOfDeleteAll.release(_stmt);
    }
  }

  @Override
  public List<Movie> index() {
    final String _sql = "SELECT * FROM movies";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 0);
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "_id");
      final int _cursorIndexOfPathToMovie = CursorUtil.getColumnIndexOrThrow(_cursor, "pathToMovie");
      final int _cursorIndexOfName = CursorUtil.getColumnIndexOrThrow(_cursor, "name");
      final int _cursorIndexOfCategory = CursorUtil.getColumnIndexOrThrow(_cursor, "category");
      final int _cursorIndexOfPublished = CursorUtil.getColumnIndexOrThrow(_cursor, "published");
      final int _cursorIndexOfDirector = CursorUtil.getColumnIndexOrThrow(_cursor, "director");
      final int _cursorIndexOfActors = CursorUtil.getColumnIndexOrThrow(_cursor, "actors");
      final int _cursorIndexOfThumbnail = CursorUtil.getColumnIndexOrThrow(_cursor, "thumbnail");
      final int _cursorIndexOfLength = CursorUtil.getColumnIndexOrThrow(_cursor, "length");
      final int _cursorIndexOfDescription = CursorUtil.getColumnIndexOrThrow(_cursor, "description");
      final int _cursorIndexOfCatflixOriginal = CursorUtil.getColumnIndexOrThrow(_cursor, "catflixOriginal");
      final int _cursorIndexOfMinimalAge = CursorUtil.getColumnIndexOrThrow(_cursor, "minimalAge");
      final List<Movie> _result = new ArrayList<Movie>(_cursor.getCount());
      while (_cursor.moveToNext()) {
        final Movie _item;
        final String _tmp_id;
        if (_cursor.isNull(_cursorIndexOfId)) {
          _tmp_id = null;
        } else {
          _tmp_id = _cursor.getString(_cursorIndexOfId);
        }
        final String _tmpPathToMovie;
        if (_cursor.isNull(_cursorIndexOfPathToMovie)) {
          _tmpPathToMovie = null;
        } else {
          _tmpPathToMovie = _cursor.getString(_cursorIndexOfPathToMovie);
        }
        final String _tmpName;
        if (_cursor.isNull(_cursorIndexOfName)) {
          _tmpName = null;
        } else {
          _tmpName = _cursor.getString(_cursorIndexOfName);
        }
        final String _tmpCategory;
        if (_cursor.isNull(_cursorIndexOfCategory)) {
          _tmpCategory = null;
        } else {
          _tmpCategory = _cursor.getString(_cursorIndexOfCategory);
        }
        final String _tmpPublished;
        if (_cursor.isNull(_cursorIndexOfPublished)) {
          _tmpPublished = null;
        } else {
          _tmpPublished = _cursor.getString(_cursorIndexOfPublished);
        }
        final String _tmpDirector;
        if (_cursor.isNull(_cursorIndexOfDirector)) {
          _tmpDirector = null;
        } else {
          _tmpDirector = _cursor.getString(_cursorIndexOfDirector);
        }
        final String _tmpActors;
        if (_cursor.isNull(_cursorIndexOfActors)) {
          _tmpActors = null;
        } else {
          _tmpActors = _cursor.getString(_cursorIndexOfActors);
        }
        final String _tmpThumbnail;
        if (_cursor.isNull(_cursorIndexOfThumbnail)) {
          _tmpThumbnail = null;
        } else {
          _tmpThumbnail = _cursor.getString(_cursorIndexOfThumbnail);
        }
        final String _tmpLength;
        if (_cursor.isNull(_cursorIndexOfLength)) {
          _tmpLength = null;
        } else {
          _tmpLength = _cursor.getString(_cursorIndexOfLength);
        }
        final String _tmpDescription;
        if (_cursor.isNull(_cursorIndexOfDescription)) {
          _tmpDescription = null;
        } else {
          _tmpDescription = _cursor.getString(_cursorIndexOfDescription);
        }
        final boolean _tmpCatflixOriginal;
        final int _tmp;
        _tmp = _cursor.getInt(_cursorIndexOfCatflixOriginal);
        _tmpCatflixOriginal = _tmp != 0;
        final String _tmpMinimalAge;
        if (_cursor.isNull(_cursorIndexOfMinimalAge)) {
          _tmpMinimalAge = null;
        } else {
          _tmpMinimalAge = _cursor.getString(_cursorIndexOfMinimalAge);
        }
        _item = new Movie(_tmp_id,_tmpPathToMovie,_tmpMinimalAge,_tmpCatflixOriginal,_tmpDescription,_tmpThumbnail,_tmpLength,_tmpActors,_tmpDirector,_tmpCategory,_tmpPublished,_tmpName);
        _result.add(_item);
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @Override
  public Movie get(final String id) {
    final String _sql = "SELECT * FROM movies WHERE _id=?";
    final RoomSQLiteQuery _statement = RoomSQLiteQuery.acquire(_sql, 1);
    int _argIndex = 1;
    if (id == null) {
      _statement.bindNull(_argIndex);
    } else {
      _statement.bindString(_argIndex, id);
    }
    __db.assertNotSuspendingTransaction();
    final Cursor _cursor = DBUtil.query(__db, _statement, false, null);
    try {
      final int _cursorIndexOfId = CursorUtil.getColumnIndexOrThrow(_cursor, "_id");
      final int _cursorIndexOfPathToMovie = CursorUtil.getColumnIndexOrThrow(_cursor, "pathToMovie");
      final int _cursorIndexOfName = CursorUtil.getColumnIndexOrThrow(_cursor, "name");
      final int _cursorIndexOfCategory = CursorUtil.getColumnIndexOrThrow(_cursor, "category");
      final int _cursorIndexOfPublished = CursorUtil.getColumnIndexOrThrow(_cursor, "published");
      final int _cursorIndexOfDirector = CursorUtil.getColumnIndexOrThrow(_cursor, "director");
      final int _cursorIndexOfActors = CursorUtil.getColumnIndexOrThrow(_cursor, "actors");
      final int _cursorIndexOfThumbnail = CursorUtil.getColumnIndexOrThrow(_cursor, "thumbnail");
      final int _cursorIndexOfLength = CursorUtil.getColumnIndexOrThrow(_cursor, "length");
      final int _cursorIndexOfDescription = CursorUtil.getColumnIndexOrThrow(_cursor, "description");
      final int _cursorIndexOfCatflixOriginal = CursorUtil.getColumnIndexOrThrow(_cursor, "catflixOriginal");
      final int _cursorIndexOfMinimalAge = CursorUtil.getColumnIndexOrThrow(_cursor, "minimalAge");
      final Movie _result;
      if (_cursor.moveToFirst()) {
        final String _tmp_id;
        if (_cursor.isNull(_cursorIndexOfId)) {
          _tmp_id = null;
        } else {
          _tmp_id = _cursor.getString(_cursorIndexOfId);
        }
        final String _tmpPathToMovie;
        if (_cursor.isNull(_cursorIndexOfPathToMovie)) {
          _tmpPathToMovie = null;
        } else {
          _tmpPathToMovie = _cursor.getString(_cursorIndexOfPathToMovie);
        }
        final String _tmpName;
        if (_cursor.isNull(_cursorIndexOfName)) {
          _tmpName = null;
        } else {
          _tmpName = _cursor.getString(_cursorIndexOfName);
        }
        final String _tmpCategory;
        if (_cursor.isNull(_cursorIndexOfCategory)) {
          _tmpCategory = null;
        } else {
          _tmpCategory = _cursor.getString(_cursorIndexOfCategory);
        }
        final String _tmpPublished;
        if (_cursor.isNull(_cursorIndexOfPublished)) {
          _tmpPublished = null;
        } else {
          _tmpPublished = _cursor.getString(_cursorIndexOfPublished);
        }
        final String _tmpDirector;
        if (_cursor.isNull(_cursorIndexOfDirector)) {
          _tmpDirector = null;
        } else {
          _tmpDirector = _cursor.getString(_cursorIndexOfDirector);
        }
        final String _tmpActors;
        if (_cursor.isNull(_cursorIndexOfActors)) {
          _tmpActors = null;
        } else {
          _tmpActors = _cursor.getString(_cursorIndexOfActors);
        }
        final String _tmpThumbnail;
        if (_cursor.isNull(_cursorIndexOfThumbnail)) {
          _tmpThumbnail = null;
        } else {
          _tmpThumbnail = _cursor.getString(_cursorIndexOfThumbnail);
        }
        final String _tmpLength;
        if (_cursor.isNull(_cursorIndexOfLength)) {
          _tmpLength = null;
        } else {
          _tmpLength = _cursor.getString(_cursorIndexOfLength);
        }
        final String _tmpDescription;
        if (_cursor.isNull(_cursorIndexOfDescription)) {
          _tmpDescription = null;
        } else {
          _tmpDescription = _cursor.getString(_cursorIndexOfDescription);
        }
        final boolean _tmpCatflixOriginal;
        final int _tmp;
        _tmp = _cursor.getInt(_cursorIndexOfCatflixOriginal);
        _tmpCatflixOriginal = _tmp != 0;
        final String _tmpMinimalAge;
        if (_cursor.isNull(_cursorIndexOfMinimalAge)) {
          _tmpMinimalAge = null;
        } else {
          _tmpMinimalAge = _cursor.getString(_cursorIndexOfMinimalAge);
        }
        _result = new Movie(_tmp_id,_tmpPathToMovie,_tmpMinimalAge,_tmpCatflixOriginal,_tmpDescription,_tmpThumbnail,_tmpLength,_tmpActors,_tmpDirector,_tmpCategory,_tmpPublished,_tmpName);
      } else {
        _result = null;
      }
      return _result;
    } finally {
      _cursor.close();
      _statement.release();
    }
  }

  @NonNull
  public static List<Class<?>> getRequiredConverters() {
    return Collections.emptyList();
  }
}
