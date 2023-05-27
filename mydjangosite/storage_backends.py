from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage):
    """ Class for storing static files. """
    location = 'static'
    default_acl = 'public-read'
    file_overwrite = True


class PublicMediaStorage(S3Boto3Storage):
    """ Class for storing public media files. """
    location = 'media/public'
    default_acl = 'public-read'
    file_overwrite = False
